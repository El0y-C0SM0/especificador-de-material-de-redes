import { TamanhoRackInvalidoError } from "./excecoes";
import { TipoEquipamento, TipoUnidadeQuantidades, TipoComponenteRack, TipoMicelanea, TipoCaboUTP, TipoAcoplador } from "./tipos";

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

export class Equipamento extends ItemRack {
    tipo: TipoEquipamento;

    constructor(tipo:TipoEquipamento, quantidade: number, alturaUnitaria: number) {
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
    equipamentos: Map<TipoEquipamento, Equipamento>;
    componentes: Map<TipoComponenteRack, ComponenteRack>
    jumperCables?: Componente<TipoCaboUTP>;
    micelaneas: Map<TipoMicelanea, Componente<TipoMicelanea>>;
    aberto: boolean;

    constructor(equipamentosAtivos: Map<TipoEquipamento, Equipamento>, aberto: boolean = false) {
        this.equipamentos = new Map<TipoEquipamento, Equipamento>(
            [...equipamentosAtivos]
        );

        if (aberto) equipamentosAtivos.set(
            TipoEquipamento.EXAUSTOR,
            new Equipamento(TipoEquipamento.EXAUSTOR, 1, 1)
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

        // TODO definir no-break
        
        let quantidadeSwitches = 0;
        if (this.equipamentos.get(TipoEquipamento.SWITCH_24) != undefined) {
            quantidadeSwitches = this.equipamentos.get(TipoEquipamento.SWITCH_24)?.quantidade ?? 0;

            this.equipamentos.set(
                TipoEquipamento.PATCH_PANEL_24,
                new  Equipamento(
                    TipoEquipamento.PATCH_PANEL_24,
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