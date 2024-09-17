import { TamanhoRackInvalidoError } from "./excecoes";
import { TipoEquipamentoRack, TipoUnidadeQuantidades, TipoComponenteRack, TipoMicelanea, TipoCaboUTP, TipoAcopladorPigtailCordao } from "./tipos";

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

class ItemRack {
    quantidade: number;
    alturaUnitaria: number;

    constructor(quantidade: number, alturaUnitaria: number) {
        this.quantidade = quantidade;
        this.alturaUnitaria = alturaUnitaria;
    }
}

export class EquipamentoRack extends ItemRack {
    tipo: TipoEquipamentoRack;

    constructor(tipo:TipoEquipamentoRack, quantidade: number, alturaUnitaria: number) {
        super(quantidade, alturaUnitaria);
        this.tipo = tipo;
    }
}

export class ComponenteRack extends ItemRack {
    tipo: TipoComponenteRack;

    constructor(tipo: TipoComponenteRack, quantidade: number, alturaUnitaria: number) {
        super(quantidade, alturaUnitaria);
        this.tipo = tipo;
    }
}

export class Rack {
    static tamanhoMaximo = 48;
    equipamentos: Map<TipoEquipamentoRack, EquipamentoRack>;
    componentes!: Map<TipoComponenteRack, ComponenteRack>;
    jumperCables?: Componente<TipoCaboUTP>;
    micelaneas!: Map<TipoMicelanea, Componente<TipoMicelanea>>;
    aberto!: boolean;

    constructor(equipamentosAtivos: Map<TipoEquipamentoRack, EquipamentoRack>, aberto: boolean = false) {
        this.equipamentos = new Map<TipoEquipamentoRack, EquipamentoRack>(
            [...equipamentosAtivos]
        );

        if (aberto) equipamentosAtivos.set(
            TipoEquipamentoRack.EXAUSTOR,
            new EquipamentoRack(TipoEquipamentoRack.EXAUSTOR, 1, 1)
        );

        this.componentes.set(
            TipoComponenteRack.BANDEJA_DESLIZANTE,
            new ComponenteRack(
                TipoComponenteRack.BANDEJA_DESLIZANTE,
                1,
                1
            )
        );

        this.componentes.set(
            TipoComponenteRack.BANDEJA_FIXA,
            new ComponenteRack(
                TipoComponenteRack.BANDEJA_FIXA,
                1,
                1
            )
        );

        let quantidadeDIO = this.equipamentos.get(TipoEquipamentoRack.DIO_24)?.quantidade ?? 0;

        this.componentes.set(
            TipoComponenteRack.BANDEJA_DE_EMENDA_12,
            new  ComponenteRack(
                TipoComponenteRack.BANDEJA_DE_EMENDA_12,
                quantidadeDIO,
                0
            )
        );
        
        let quantidadeSwitches = 0;
        if (this.equipamentos.get(TipoEquipamentoRack.SWITCH_24) != undefined) {
            quantidadeSwitches = this.equipamentos.get(TipoEquipamentoRack.SWITCH_24)?.quantidade ?? 0;

            this.equipamentos.set(
                TipoEquipamentoRack.PATCH_PANEL_24,
                new  EquipamentoRack(
                    TipoEquipamentoRack.PATCH_PANEL_24,
                    quantidadeSwitches,
                    1
                )
            );

            this.componentes.set(
                TipoComponenteRack.ORGANIZADOR_FRONTAL,
                new  ComponenteRack(
                    TipoComponenteRack.ORGANIZADOR_FRONTAL,
                    quantidadeSwitches,
                    1
                )
            );
            
            this.jumperCables = new Componente<TipoCaboUTP>(
                quantidadeSwitches - 1,
                TipoUnidadeQuantidades.UNIDADE,
                TipoCaboUTP.CINZA_CAT7
            );
            
        }

        let altura = this.alturaTotal;

        if (altura > 48)
            throw new TamanhoRackInvalidoError(
                `Tamanho do rack alcançou ${altura} e 
                execedeu o limite recomendavel de 44U, 
                que deixaria 4 para expandir`,
                altura
            );
        
        this.defineMicelaneas(quantidadeSwitches);

        Object.freeze(this);
    }
    
    defineMicelaneas(quantidadeSwitches: number): void {
        this.micelaneas.set(
            TipoMicelanea.ETIQUETAS_IDENTIFICACAO,
            new Componente<TipoMicelanea>(
                /*
                    para todas as portas do patch panels e switches
                    + 
                    os patch panels e switches 
                    + 
                    os cabos jumper
                */
                quantidadeSwitches * 24 * 2 + quantidadeSwitches * 2 + quantidadeSwitches - 1,
                TipoUnidadeQuantidades.UNIDADE,
                TipoMicelanea.ETIQUETAS_IDENTIFICACAO
            )
        );

        this.micelaneas.set(
            TipoMicelanea.PORCAS_GAIOLAS,
            new Componente<TipoMicelanea>(
                // cada U de altura requer 2 porcas de cada lado
                this.alturaTotal * 4,
                TipoUnidadeQuantidades.UNIDADE,
                TipoMicelanea.PORCAS_GAIOLAS
            )
        );
    }

    static arredondaAltura(altura: number) {
        if (altura <= 12)
            return altura + altura % 2;

        return Math.ceil(altura / 4) * 4;
    }

    get alturaTotal() {
        let altura = [...this.equipamentos.values(), ...this.componentes.values()].reduce((acc, curr) => acc + curr.alturaUnitaria, 0) * 1.5;

        return  Rack.arredondaAltura(altura);;
    }
}