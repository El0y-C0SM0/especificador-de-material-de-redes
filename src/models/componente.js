import { TamanhoRackInvalidoError } from "./excecoes";
import { TipoEquipamentoRack, TipoUnidadeQuantidades, TipoComponenteRack, TipoMicelanea, TipoCaboUTP } from "./tipos";
export class Componente {
    constructor(quatidade, unidade, tipo) {
        this.quantidade = quatidade;
        this.unidade = unidade;
        this.tipo = tipo;
    }
}
class ItemRack {
    constructor(quantidade, alturaUnitaria) {
        this.quantidade = quantidade;
        this.alturaUnitaria = alturaUnitaria;
    }
}
export class EquipamentoRack extends ItemRack {
    constructor(tipo, quantidade, alturaUnitaria) {
        super(quantidade, alturaUnitaria);
        this.tipo = tipo;
    }
}
export class ComponenteRack extends ItemRack {
    constructor(tipo, quantidade, alturaUnitaria) {
        super(quantidade, alturaUnitaria);
        this.tipo = tipo;
    }
}
export class Rack {
    constructor(equipamentosAtivos, aberto = false) {
        var _a, _b, _c, _d;
        this.equipamentos = new Map([...equipamentosAtivos]);
        this.aberto = aberto;
        this.componentes = new Map();
        this.micelaneas = new Map();
        if (!aberto)
            equipamentosAtivos.set(TipoEquipamentoRack.EXAUSTOR, new EquipamentoRack(TipoEquipamentoRack.EXAUSTOR, 1, 1));
        this.componentes.set(TipoComponenteRack.BANDEJA_DESLIZANTE, new ComponenteRack(TipoComponenteRack.BANDEJA_DESLIZANTE, 1, 4));
        this.componentes.set(TipoComponenteRack.BANDEJA_FIXA, new ComponenteRack(TipoComponenteRack.BANDEJA_FIXA, 1, 1));
        
        let quantidadeDIO = (_b = (_a = this.equipamentos.get(TipoEquipamentoRack.DIO_24)) === null || _a === void 0 ? void 0 : _a.quantidade) !== null && _b !== void 0 ? _b : 0;
        this.componentes.set(TipoComponenteRack.BANDEJA_DE_EMENDA_12, new ComponenteRack(TipoComponenteRack.BANDEJA_DE_EMENDA_12, quantidadeDIO, 0));
        let quantidadeSwitches = 0;
        if (this.equipamentos.get(TipoEquipamentoRack.SWITCH_24) != undefined) {
            quantidadeSwitches = (_d = (_c = this.equipamentos.get(TipoEquipamentoRack.SWITCH_24)) === null || _c === void 0 ? void 0 : _c.quantidade) !== null && _d !== void 0 ? _d : 0;
            this.equipamentos.set(TipoEquipamentoRack.PATCH_PANEL_24, new EquipamentoRack(TipoEquipamentoRack.PATCH_PANEL_24, quantidadeSwitches, 1));
            this.componentes.set(TipoComponenteRack.ORGANIZADOR_FRONTAL, new ComponenteRack(TipoComponenteRack.ORGANIZADOR_FRONTAL, quantidadeSwitches, 1));
            this.jumperCables = new Componente(quantidadeSwitches - 1, TipoUnidadeQuantidades.UNIDADE, TipoCaboUTP.CINZA_CAT7);
        }
        let altura = this.alturaTotal;
        if (altura > 48)
            throw new TamanhoRackInvalidoError(`Tamanho do rack alcançou ${altura} e 
                execedeu o limite recomendavel de 44U, 
                que deixaria 4 para expandir`, altura);
        this.defineMicelaneas(quantidadeSwitches);
        Object.freeze(this);
    }
    defineMicelaneas(quantidadeSwitches) {
        this.micelaneas.set(TipoMicelanea.ETIQUETAS_IDENTIFICACAO, new Componente(
        /*
            para todas as portas do patch panels e switches
            +
            os patch panels e switches
            +
            os cabos jumper
        */
        quantidadeSwitches * 24 * 2 + quantidadeSwitches * 2 + quantidadeSwitches - 1, TipoUnidadeQuantidades.UNIDADE, TipoMicelanea.ETIQUETAS_IDENTIFICACAO));
        this.micelaneas.set(TipoMicelanea.PORCAS_GAIOLAS, new Componente(
        // cada U de altura requer 2 porcas de cada lado
        this.alturaTotal * 4, TipoUnidadeQuantidades.UNIDADE, TipoMicelanea.PORCAS_GAIOLAS));
    }
    static arredondaAltura(altura) {
        if (altura <= 12)
            return altura + altura % 2;
        return Math.ceil(altura / 4) * 4;
    }
    get alturaTotal() {
        let altura = [...this.equipamentos.values(), ...this.componentes.values()].reduce((acc, curr) => acc + curr.alturaUnitaria, 0) * 1.5;
        return Rack.arredondaAltura(altura);
        ;
    }
    get altura() {
        return this.alturaTotal;
    }
}
Rack.tamanhoMaximo = 48;
//# sourceMappingURL=componente.js.map