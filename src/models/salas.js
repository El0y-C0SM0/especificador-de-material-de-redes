import { Componente, EquipamentoRack, Rack } from "./componente.js";
import * as Tipos from './tipos.js';
import { DistanciaInvalidaError, } from "./excecoes.js";
export class AreaDeTrabalho {
    constructor(pontosTelecom) {
        this.patchCords = new Map();
        this.micelaneas = new Map();
        this.pontosTelecom = pontosTelecom;
    }
    get pontosTelecom() {
        return this._pontosTelecom;
    }
    set pontosTelecom(pontosTelecom) {
        this._pontosTelecom = pontosTelecom;
        let totalPontos = 0;
        let quantidadeTomadas = 0;
        pontosTelecom.forEach(ponto => {
            totalPontos += ponto.quantidade;
            quantidadeTomadas += (ponto.tipo === Tipos.TipoPontoTelecom.REDE ? ponto.quantidade * 2 : ponto.quantidade);
            let tipoCabo = Tipos.TipoPontoTelecom.toTipoPatchCord(ponto.tipo);
            this.patchCords.set(tipoCabo, new Componente(ponto.quantidade, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoCabo));
        });
        this.tomadasFemeas = new Componente(quantidadeTomadas, Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoConector.CAT6);
        this.micelaneas.set(Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO, new Componente(quantidadeTomadas + totalPontos, // tomadas + espelhos
        Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO));
    }
    get numeroDiciplinas() {
        return this.pontosTelecom == null ? 0 : this.pontosTelecom.size;
    }
    get numeroConectores() {
        return this.tomadasFemeas == null ? 0 : this.tomadasFemeas.quantidade;
    }
}
export class SalaDeTelecom {
    constructor(areaDeTrabalho, comprimentoMalhaHorizontal, numeroPiso, rackAberto = false) {
        this.rackAberto = rackAberto;
        this.areaDeTrabalho = areaDeTrabalho;
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
        if (this.numeroFibras <= 8) {
            this.equipamentos.set(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO, new EquipamentoRack(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO, 1, 0));
            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.fibrasOpticasRecebidas.tipo, true);
            quantidadeAcopladores = this.numeroFibras / 2;
        }
        else {
            this.equipamentos.set(Tipos.TipoEquipamentoRack.DIO_24, new EquipamentoRack(Tipos.TipoEquipamentoRack.DIO_24, Math.ceil(this.numeroFibras / 24), 1));
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
            for (; Rack.arredondaAltura(error.altura / k) < 48; k++)
                ;
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
export class SalaDeEquipamentos extends SalaDeTelecom {
    constructor(areaDeTrabalho, comprimentoMalhaHorizontal, numeroPiso, salasDeTelecom, salasDeEquipamento = [], distanciaSEQ = 0, rackAberto = false, quantidadeFibrasRecebidas = 12, tipoFibrasRecebidas = Tipos.TipoFibraOptica.FOSM_9_125) {
        super(areaDeTrabalho, comprimentoMalhaHorizontal, numeroPiso, rackAberto = rackAberto);
        this.salasDeTelecom = salasDeTelecom;
        this.salasDeEquipamento = salasDeEquipamento;
        this.distanciaSEQ = distanciaSEQ;
        this.defineFibrasOpticas(quantidadeFibrasRecebidas, tipoFibrasRecebidas);
        this.defineAtivos();
    }
    save() {
        super.save();
        this.defineFibrasOpticas();
        this.defineAtivos();
    }
    // informa o tipo da fibra que leva até as SEQ e SET
    get tipoFibra() {
        let maiorFibra = 0;
        if (this.salasDeEquipamento.length == 0) {
            let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
                return a.numeroPiso - b.numeroPiso;
            });
            maiorFibra = Math.max(...sortedSalasDeTelecom.map(sala => {
                return Math.abs(this.numeroPiso - sala.numeroPiso + 1) * this.peDireitoAndares;
            }));
        }
        else if (this.salasDeEquipamento.length != 0) {
            let sortedSalaDeEquipamentos = this.salasDeEquipamento.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);
            maiorFibra = Math.max(...sortedSalaDeEquipamentos.map(sala => sala.distanciaSEQ));
        }
        return Tipos.TipoFibraOptica.getTipoFibra(maiorFibra);
    }
    get diciplinas() {
        let diciplinas = super.diciplinas;
        this.salasDeTelecom.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });
        this.salasDeEquipamento.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });
        return diciplinas;
    }
    // informa o numero de fibras que leva até as SEQ e SET
    get numeroFibras() {
        let numeroFibras = 0;
        this.salasDeTelecom.forEach(sala => numeroFibras += sala.numeroFibras);
        this.salasDeEquipamento.forEach(sala => numeroFibras += sala.numeroFibras);
        numeroFibras += super.numeroFibras;
        return numeroFibras;
    }
    get fibraBackbone() {
        let distancia = 0;
        let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
            return a.numeroPiso - b.numeroPiso;
        });
        sortedSalasDeTelecom.forEach(sala => {
            distancia += Math.abs(this.numeroPiso - sala.numeroPiso + 1) * this.peDireitoAndares;
        });
        let sortedSalaDeEquipamentos = this.salasDeEquipamento.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);
        sortedSalaDeEquipamentos.forEach(sala => distancia += sala.distanciaSEQ);
        return new Componente(distancia, Tipos.TipoUnidadeQuantidades.METRO, this.tipoFibra);
    }
    defineAtivos() {
        super.defineAtivos();
        this.salasDeTelecom.forEach(sala => sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV));
        if (this.equipamentos.get(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO) != undefined) {
            this.equipamentos.delete(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO);
        }
        if (this.diciplinas.has(Tipos.TipoPontoTelecom.CFTV)) {
            let quantidadeFibrasCFTV = 0;
            this.salasDeTelecom.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 2;
            });
            this.salasDeEquipamento.forEach(sala => {
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
        tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.fibrasOpticasRecebidas.tipo, false);
        this.defineAcopladores(tipoAcoplador, this.fibrasOpticasRecebidas.quantidade);
    }
    defineFibrasOpticas(quantidadeFibrasRecebidas = 12, tipoFibraRecebida = Tipos.TipoFibraOptica.FOSM_9_125) {
        let tipoFibra = this.fibraBackbone.tipo;
        this.salasDeTelecom.forEach(sala => sala.fibrasOpticasRecebidas =
            new Componente(sala.numeroFibras, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoFibra));
        this.salasDeEquipamento.forEach(sala => sala.fibrasOpticasRecebidas =
            new Componente(sala.numeroFibras, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoFibra));
        this.fibrasOpticasRecebidas = new Componente(quantidadeFibrasRecebidas, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoFibraRecebida);
    }
}
//# sourceMappingURL=salas.js.map