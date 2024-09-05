import { Componente, Equipamento } from "./componente";
import * as Tipos from './tipos';

export class AreaDeTrabalho {
    patchCords: Componente<Tipos.TipoCaboUTP>[];
    numEtiquetas: number;
    tomadasFemeas: Componente<Tipos.TipoConector> | null;
    pontosTelecom: Componente<Tipos.TipoPontoTelecom>[] | null;

    constructor(pontosTelecom: Componente<Tipos.TipoPontoTelecom>[]) {
        this.pontosTelecom = pontosTelecom;
        this.patchCords = [];

        let totalPontos: number = 0;
        let quantidadeTomadas: number = 0;

        for (let ponto of pontosTelecom) {
            totalPontos += ponto.quantidade;
            quantidadeTomadas += (ponto.tipo === Tipos.TipoPontoTelecom.REDE ? ponto.quantidade * 2 : ponto.quantidade);

            let tipoCabo: Tipos.TipoCaboUTP;
            switch (ponto.tipo) {
                case Tipos.TipoPontoTelecom.CFTV:
                    tipoCabo = Tipos.TipoCaboUTP.BRANCO_CAT6;
                    break;
                case Tipos.TipoPontoTelecom.REDE:
                    tipoCabo = Tipos.TipoCaboUTP.AZUL_CAT6;
                case Tipos.TipoPontoTelecom.VOIP:
                default:
                    tipoCabo = Tipos.TipoCaboUTP.AMARELO_CAT6;
                    break;
            }

            this.patchCords.push(new Componente<Tipos.TipoCaboUTP>(ponto.quantidade, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoCabo));
        }

        this.tomadasFemeas = new Componente<Tipos.TipoConector>(quantidadeTomadas, Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoConector.CAT6);
        this.numEtiquetas = quantidadeTomadas + totalPontos;
    }

    get numeroDiciplinas(): number {
        return this.pontosTelecom == null ? 0 : this.pontosTelecom.length;
    }
}

export class Rack {
    equipamentos: Equipamento[];
    fechado: boolean;

    get alturaTotal() {
        let altura = this.equipamentos.reduce((acc, curr) => acc + curr.altura, 0) * 1.5;
        
        if(altura <= 12)
            return altura + altura % 2;
        
        return Math.ceil(altura / 4) * 4;
    }
}

abstract class UnidadeDeRede {
    rackAberto?: boolean;
    pigtails?: Componente<Tipos.TipoPigtailCordao>[];
    cordoes?: Componente<Tipos.TipoPigtailCordao>[];
    acopladores?: Componente<Tipos.TipoAcoplador>[];
    equipamentos?: Equipamento[];

    constructor(
        equipamentos: Equipamento[] = [],
        pigtails: Componente<Tipos.TipoPigtailCordao>[] = [],
        cordoes: Componente<Tipos.TipoPigtailCordao>[] = [],
        acopladores: Componente<Tipos.TipoAcoplador>[] = [],
        rackAberto: boolean = false
    ) {
        this.rackAberto = rackAberto;
        this.equipamentos = equipamentos;
        this.acopladores = acopladores;
        this.cordoes = cordoes;
        this.pigtails = pigtails;
    }
}

export class SalaDeTelecom extends UnidadeDeRede {
    areaDeTrabalho: AreaDeTrabalho;
    distanciaPontos: number;
    andarPrincipal: boolean;
    numeroPiso: number;

    constructor(areaDeTrabalho: AreaDeTrabalho) {
        super();
        this.areaDeTrabalho = areaDeTrabalho;
        this.distanciaPontos = 0;
        this.rackAberto = false;
        this.pigtails = [];
        this.cordoes = [];
    }

    get numeroFibras() {
        // 2 para cada diciplina mais 2 reserva para cada
        return this.areaDeTrabalho.numeroDiciplinas * 4;
    }
}

export class SalaDeEquipamentos extends UnidadeDeRede {
    salasDeTelecom: UnidadeDeRede[];
    salasDeEquipamentos: SalaDeEquipamentos[];
    peDireitoAndares: number;

    constructor() {
        super();
        this.salasDeTelecom = [];
        this.rackAberto = false;
        this.pigtails = [];
        this.cordoes = [];
    }
}