export enum TipoCaboUTP {
    AZUL_CAT6,
    VERMELHO_CAT6,
    AMARELO_CAT6,
    BRANCO_CAT6,
    CINZA_CAT7
};

export enum TipoConector {
    CAT6
};

export class TipoPontoTelecom {
    static REDE = 0;
    static CFTV = 1;
    static VOIP = 2;

    static toTipoPatchCord(tipoPonto: TipoPontoTelecom): TipoCaboUTP {
        switch (tipoPonto) {
            case TipoPontoTelecom.CFTV:
                return TipoCaboUTP.BRANCO_CAT6;
            case TipoPontoTelecom.REDE:
                return TipoCaboUTP.AZUL_CAT6;
            case TipoPontoTelecom.VOIP:
            default:
                return TipoCaboUTP.AMARELO_CAT6;
        }
    }

    static toTipoPatchCable(tipoPonto: TipoPontoTelecom): TipoCaboUTP {
        switch (tipoPonto) {
            case TipoPontoTelecom.CFTV:
                return TipoCaboUTP.VERMELHO_CAT6;
            case TipoPontoTelecom.REDE:
                return TipoCaboUTP.AZUL_CAT6;
            case TipoPontoTelecom.VOIP:
            default:
                return TipoCaboUTP.AMARELO_CAT6;
        }
    }
}

export class TipoAcopladorPigtailCordao {
    static LC_DUPLO_MM_50_125 = 0;
    static LC_SIMPLES_MM_50_125 = 1;
    static LC_DUPLO_SM_9_125 = 2;
    static LC_SIMPLES_SM_9_125 = 3;

    static getTipo(tipo: TipoFibraOptica, duplo: boolean): TipoAcopladorPigtailCordao{
        if (tipo == TipoFibraOptica.FOMMIG_50_125) {
            if (duplo) return TipoAcopladorPigtailCordao.LC_DUPLO_MM_50_125;
            else return TipoAcopladorPigtailCordao.LC_DUPLO_MM_50_125;
        } else {
            if (duplo) return TipoAcopladorPigtailCordao.LC_SIMPLES_SM_9_125;
            else return TipoAcopladorPigtailCordao.LC_SIMPLES_SM_9_125;
        }
    }
}

export enum TipoEquipamento {
    PATCH_PANEL_24,
    PATCH_PANEL,
    SWITCH_24,
    DIO_24,
    DIO_24_4,
    TERMINADOR_OPTICO,
    SVR_24,
    EXAUSTOR,
    NO_BREAK,
}

export enum TipoComponenteRack {
    BANDEJA_FIXA,
    BANDEJA_DESLIZANTE,
    ORGANIZADOR_FRONTAL,
    BANDEJA_DE_EMENDA_12
}

export enum TipoUnidadeQuantidades {
    METRO,
    CAIXA,
    UNIDADE
}

export enum TipoMicelanea {
    ETIQUETAS_IDENTIFICACAO,
    ABRACADEIRAS,
    PORCAS_GAIOLAS
}

export class TipoFibraOptica {
    static FOMMIG_50_125 = 0;
    static FOSM_9_125 = 1;

    static getTipoFibra(distancia: number) : TipoFibraOptica {
        if(distancia <= 300)
            return  TipoFibraOptica.FOMMIG_50_125;

        return  TipoFibraOptica.FOSM_9_125;
    }
}