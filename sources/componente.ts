import { TipoEquipamento, TipoUnidadeQuantidades, TipoComponenteRack } from "./tipos";

export class Componente<E> {
    quantidade?: number;
    unidade?: TipoUnidadeQuantidades;
    tipo?: E;

    constructor(quatidade: number, unidade: TipoUnidadeQuantidades, tipo: E) {
        this.quantidade = quatidade;
        this.unidade = unidade;
        this.tipo = tipo;
    }
}

class ItemRack {
    quantidade?: number;
    alturaUnitaria?: number;

    constructor(quantidade: number, alturaUnitaria: number) {
        this.quantidade = quantidade;
        this.alturaUnitaria = alturaUnitaria;
    }
}

export class Equipamento extends ItemRack {
    tipo?: TipoEquipamento;

    constructor(tipo:TipoEquipamento, quantidade: number, alturaUnitaria: number) {
        super(quantidade, alturaUnitaria);
        this.tipo = tipo;
    }
}

export class ComponenteRack extends ItemRack {
    tipo?: TipoComponenteRack;

    constructor(tipo: TipoComponenteRack, quantidade: number, alturaUnitaria: number) {
        super(quantidade, alturaUnitaria);
        this.tipo = tipo;
    }
}