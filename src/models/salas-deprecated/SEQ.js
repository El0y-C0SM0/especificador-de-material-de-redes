import { 
    ComponenteModel as Componente, 
    EquipamentoRackModel as EquipamentoRack,
    TiposModels as Tipos,
    RackModel as Rack
} from "../../exports/modelsExports.js"


//import SalaTelecom from "./SalaTelecom.js";

class SEQ /*extends SalaTelecom*/ {
    constructor(numeroPiso, alturaAndares, salasDeTelecom, salasDeEquipamento = [], distanciaSEQ = 0, quantidadeFibrasRecebidas = 12, tipoFibrasRecebidas = Tipos.TipoFibraOptica.FOSM_9_125) {
        this.numeroPiso = numeroPiso;
        this.salasDeTelecom = salasDeTelecom;
        this.salasDeEquipamento = salasDeEquipamento;
        this.distanciaSEQ = distanciaSEQ;
        this.alturaAndares = alturaAndares;
        this.rackAberto = salasDeTelecom[numeroPiso].rackAberto;
        this.defineFibrasOpticas(quantidadeFibrasRecebidas, tipoFibrasRecebidas);
        //this.defineAtivos();
    }
    save() {
        //super.save();
        this.defineFibrasOpticas();
        //this.defineAtivos();
    }
    // informa o tipo da fibra que leva até as SEQ e SET
    get tipoFibra() {
        var _a, _b, _c, _d;
        let maiorFibra = 0;
        if (this.salasDeEquipamento == undefined)
            return Tipos.TipoFibraOptica.FOMMIG_50_125;
        if (((_a = this === null || this === void 0 ? void 0 : this.salasDeEquipamento) === null || _a === void 0 ? void 0 : _a.length) == 0) {
            let sortedSalasDeTelecom = (_b = this === null || this === void 0 ? void 0 : this.salasDeTelecom) === null || _b === void 0 ? void 0 : _b.slice().sort((a, b) => {
                return a.numeroPiso - b.numeroPiso;
            });
            maiorFibra = Math.max(...sortedSalasDeTelecom.map(sala => {
                return Math.abs(this.numeroPiso - sala.numeroPiso + 1) * this.alturaAndares;
            }));
        }
        else if (((_c = this === null || this === void 0 ? void 0 : this.salasDeEquipamento) === null || _c === void 0 ? void 0 : _c.length) != 0) {
            let sortedSalaDeEquipamentos = (_d = this === null || this === void 0 ? void 0 : this.salasDeEquipamento) === null || _d === void 0 ? void 0 : _d.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);
            maiorFibra = Math.max(...sortedSalaDeEquipamentos.map(sala => sala.distanciaSEQ));
        }
        return Tipos.TipoFibraOptica.getTipoFibra(maiorFibra);
    }
    /*
    get diciplinas() {
        var _a, _b;
        let diciplinas = super.diciplinas;
        (_a = this === null || this === void 0 ? void 0 : this.salasDeTelecom) === null || _a === void 0 ? void 0 : _a.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });
        (_b = this === null || this === void 0 ? void 0 : this.salasDeEquipamento) === null || _b === void 0 ? void 0 : _b.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });
        return diciplinas;
    }
    // informa o numero de fibras que leva até as SEQ e SET
    get numeroFibras() {
        var _a, _b;
        let numeroFibras = 0;
        (_a = this === null || this === void 0 ? void 0 : this.salasDeTelecom) === null || _a === void 0 ? void 0 : _a.forEach(sala => numeroFibras += sala.numeroFibras);
        (_b = this === null || this === void 0 ? void 0 : this.salasDeEquipamento) === null || _b === void 0 ? void 0 : _b.forEach(sala => numeroFibras += sala.numeroFibras);
        numeroFibras += super.numeroFibras;
        return (numeroFibras == 0 ? super.numeroFibras : numeroFibras);
    } */
    get fibraBackbone() {
        let distancia = 0;
        let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
            return a.numeroPiso - b.numeroPiso;
        });
        sortedSalasDeTelecom.forEach(sala => {
            distancia += (Math.abs(this.numeroPiso - sala.numeroPiso) + 2) * this.alturaAndares;
        });
        let sortedSalaDeEquipamentos = this.salasDeEquipamento.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);
        sortedSalaDeEquipamentos.forEach(sala => distancia += sala.distanciaSEQ);
        return new Componente(distancia, Tipos.TipoUnidadeQuantidades.METRO, this.tipoFibra);
    } 
    defineFibrasOpticas(quantidadeFibrasRecebidas = 12, tipoFibraRecebida = Tipos.TipoFibraOptica.FOSM_9_125) {
        let tipoFibra = this.fibraBackbone.tipo;
        this.salasDeTelecom.forEach(sala => {
            sala.fibrasOpticasRecebidas = new Componente(sala.numeroFibras, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoFibra);
            sala.save();
        });
        this.salasDeEquipamento.forEach(sala => {
            sala.fibrasOpticasRecebidas = new Componente(sala.numeroFibras, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoFibra);
            sala.save();
        });
        this.fibrasOpticasRecebidas = new Componente(quantidadeFibrasRecebidas, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoFibraRecebida);
    }

    defineAtivos() {
        var _a, _b;
        // this.salasDeTelecom.forEach(sala => sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV));
        if (this.equipamentosAtivos.get(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO) != undefined) {
            this.equipamentosAtivos.delete(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO);
        }
        if (this.diciplinas.has(Tipos.TipoPontoTelecom.CFTV)) {
            let quantidadeFibrasCFTV = 0;
            (_a = this === null || this === void 0 ? void 0 : this.salasDeTelecom) === null || _a === void 0 ? void 0 : _a.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 2;
            });
            (_b = this === null || this === void 0 ? void 0 : this.salasDeEquipamento) === null || _b === void 0 ? void 0 : _b.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 1;
            });
            this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.SVR_24, new EquipamentoRack(Tipos.TipoEquipamentoRack.SVR_24, Math.ceil(quantidadeFibrasCFTV / 24), 2));
        }
        this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.DIO_24_4, new EquipamentoRack(Tipos.TipoEquipamentoRack.DIO_24, Math.ceil(this.numeroFibras / 24), 1));
        let tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.tipoFibra, false);
        this.defineAcopladores(tipoAcoplador, this.numeroFibras);
        this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.DIO_24_4, new EquipamentoRack(Tipos.TipoEquipamentoRack.DIO_24_4, 
        // mais 1 para receber as fibras da entrada de facilidade separado.
        Math.ceil(this.numeroFibras / 24) + 1, 1));
        if (this.fibrasOpticasRecebidas != undefined) {
            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.fibrasOpticasRecebidas.tipo, false);
            this.defineAcopladores(tipoAcoplador, this.fibrasOpticasRecebidas.quantidade);
        }
    }
    get equipamentos() {
        let equipamentos = new Map();
        this.racks.forEach(rack => {
            rack.equipamentos.forEach(equipamento => {
                let equipamentoSalvo = equipamentos.get(equipamento.tipo);
                if (equipamentoSalvo !== undefined) {
                    equipamentoSalvo.quantidade += equipamento.quantidade;
                    equipamentos.set(equipamento.tipo, equipamento);
                }
            });
        });
        return equipamentos;
    }
    get racks() {
        let racks = [];
        // 20 por que ainda será contado os patch panels, exaustor e outros componentes.
        try {
            return [new Rack(this.equipamentosAtivos, this.rackAberto)];
        }
        catch (error) {
            /** Algoritmo da divisão de componentes
             *
             * Como um rack tem limite máximo de 48u, preucupo-me em reservar um espaço para os
             * componetes que ainda serão postos. A estratégia de divisão é buscar preencher o maior
             * rack possivel, caso sobre, divide em racks de tamanhos similares e menores. Com os
             * racks divididos, ele calcula como seria adcionar itens a cada rack seguindo a ordem de
             * disposição dos itens, sem mesclas.
             */
            let k = 1;
            for (; Rack.arredondaAltura(error.altura / k) < 48; k++);
            const fracao = Rack.arredondaAltura(error.altura / k);
            let cont = fracao;
            let selecionados = new Map();
            this.equipamentosAtivos.forEach(equipamento => {
                if (cont - equipamento.quantidade < 0) {
                    selecionados.set(equipamento.tipo, new EquipamentoRack(equipamento.tipo, cont, equipamento.alturaUnitaria));
                    racks.push(new Rack(selecionados));
                    selecionados.clear();
                    selecionados.set(equipamento.tipo, new EquipamentoRack(equipamento.tipo, -(cont - equipamento.quantidade), equipamento.alturaUnitaria));
                    cont = fracao + cont - equipamento.quantidade;
                }
                else {
                    selecionados.set(equipamento.tipo, equipamento);
                }
            });
            racks.push(new Rack(selecionados));
        }
        return racks;
    }
}

export default SEQ;