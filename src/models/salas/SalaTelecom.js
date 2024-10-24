import { 
    ComponenteModel as Componente, 
    EquipamentoRackModel as EquipamentoRack,
    RackModel as Rack,
    TiposModels as Tipos, 
    DistanciaInvalidaError
} from "../../exports/modelsExports.js"

class SalaTelecom {
    constructor(areaDeTrabalho, comprimentoMalhaHorizontal, numeroPiso, rackAberto = false) {
        this.areaDeTrabalho = areaDeTrabalho;
        this.rackAberto = rackAberto;
        this.equipamentosAtivos = new Map();
        this.pigtails = new Map();
        this.cordoes = new Map();
        this.acopladores = new Map();
        this.micelaneas = new Map();
        if (comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError("Distancia dos pontos de telecom até a sala de telecom não deve exeder 90 metros");
        }
        this.comprimentoMalhaHorizontal = comprimentoMalhaHorizontal;
        this.numeroPiso = numeroPiso;
        this.defineAtivos();
    }
    save() {
        if (this.comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError("Distancia dos pontos de telecom até a sala de telecom não deve exeder 90 metros");
        }
        this.defineAtivos();
    }
    defineAtivos() {
        this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.SWITCH_24, new EquipamentoRack(Tipos.TipoEquipamentoRack.SWITCH_24, Math.ceil(this.areaDeTrabalho.numeroConectores / 24), 1));
        let tipoAcoplador;
        let quantidadeAcopladores;
        if (this.fibrasOpticasRecebidas == undefined)
            return;
        if (this.numeroFibras <= 8) {
            this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO, new EquipamentoRack(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO, 1, 0));
            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.fibrasOpticasRecebidas.tipo, true);
            quantidadeAcopladores = this.numeroFibras / 2;
        }
        else {
            this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.DIO_24, new EquipamentoRack(Tipos.TipoEquipamentoRack.DIO_24, Math.ceil(this.numeroFibras / 24), 1));
            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.fibrasOpticasRecebidas.tipo, false);
            quantidadeAcopladores = this.numeroFibras;
        }
        this.defineAcopladores(tipoAcoplador, quantidadeAcopladores);
    }
    defineAcopladores(tipoAcoplador, quantidadeAcopladores) {
        this.pigtails.set(tipoAcoplador, new Componente(quantidadeAcopladores, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoAcoplador));
        this.cordoes.set(tipoAcoplador, new Componente(quantidadeAcopladores, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoAcoplador));
        this.acopladores.set(tipoAcoplador, new Componente(quantidadeAcopladores, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoAcoplador));
    }
    get numeroFibras() {
        // 2 para cada diciplina mais 2 reserva para cada
        return this.areaDeTrabalho.numeroDiciplinas * 4;
    }
    get diciplinas() {
        let diciplinas = new Set();
        this.areaDeTrabalho.pontosTelecom.forEach(ponto => diciplinas.add(ponto.tipo));
        return diciplinas;
    }
    get jumperCables() {
        var _a;
        let quantidadeSwitches = (_a = this.equipamentosAtivos.get(Tipos.TipoEquipamentoRack.SWITCH_24)) === null || _a === void 0 ? void 0 : _a.quantidade;
        if (quantidadeSwitches == undefined)
            return undefined;
        let quantidade = this.racks.reduce((acc, rack) => { var _a, _b; return acc + ((_b = (_a = rack === null || rack === void 0 ? void 0 : rack.jumperCables) === null || _a === void 0 ? void 0 : _a.quantidade) !== null && _b !== void 0 ? _b : 0); }, 0);
        return new Componente(quantidade, Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoCaboUTP.CINZA_CAT7);
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
    get patchCables() {
        let patchCables = new Map();
        this.areaDeTrabalho.pontosTelecom.forEach(ponto => {
            let tipo = Tipos.TipoPontoTelecom.toTipoPatchCable(ponto.tipo);
            patchCables.set(tipo, new Componente(ponto.quantidade, Tipos.TipoUnidadeQuantidades.UNIDADE, tipo));
        });
        return patchCables;
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

export default SalaTelecom;