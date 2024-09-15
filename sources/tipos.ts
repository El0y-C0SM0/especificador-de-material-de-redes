export enum TipoCaboUTP {
    AZUL_CAT6,
    VERMELHO_CAT6,
    AMARELO_CAT6,
    BRANCO_CAT6,
    // TODO mudar para CAT6A
    CINZA_CAT7
};

export enum TipoConector {
    CAT6
};

export class TipoPontoTelecom {
    // TODO mudar REDE para ethernet
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

// TODO definir melhor
export enum TipoPigtailCordao {
    LC_DUPLO_50_125,
    LC_SIMPLES_50_125,
    SC_SIMPLES_50_125,
}

export enum TipoAcoplador {
    LC_DUPLO,
    LC_SIMPLES
}

export enum TipoEquipamento {
    PATCH_PANEL_24,
    PATCH_PANEL,
    SWITCH_24,
    DIO_24,
    DIO_24_4,
    TERMINADOR_OPTICO,
    DVR_24,
    EXAUSTOR,
    NO_BREAK,
}

export enum TipoComponenteRack {
    BANDEJA_FIXA,
    BANDEJA_DESLIZANTE
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
        if(distancia <= 550)
            return  TipoFibraOptica.FOMMIG_50_125;

        return  TipoFibraOptica.FOSM_9_125;
    }
}