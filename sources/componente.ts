import { TipoEquipamento, TipoUnidadeQuantidades } from "./tipos";

export class Componente<E> {
    quantidade: number;
    unidade: TipoUnidadeQuantidades;
    tipo: E;

    constructor(quatidade: number, unidade: TipoUnidadeQuantidades, tipo: E) {
        this.quantidade = quatidade;
        this.unidade = unidade;
        this.tipo = tipo;
    }
}

export class Equipamento {
    quantidade: number;
    altura: number;
    numeroEtiquetas: number;
    tipo: TipoEquipamento;
}