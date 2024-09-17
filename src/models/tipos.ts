export enum TipoCaboUTP {
    AZUL_CAT6 = 'Cabo UTP azul cat6.',
    VERMELHO_CAT6 = 'Cabo UTP vermelho cat6.',
    AMARELO_CAT6 = 'Cabo UTP amarelo cat6.',
    BRANCO_CAT6 = 'Cabo UTP branco cat6.',
    CINZA_CAT7 = 'Cabo UTP cinza cat7.'
};

export enum TipoConector {
    CAT6 = 'RJ45 Cat6'
};

export class TipoPontoTelecom {
    static REDE = "Rede";
    static CFTV = "CFTV";
    static VOIP = "VoIP";

    static toTipoPatchCord(tipoPonto: TipoPontoTelecom): TipoCaboUTP {
        switch (tipoPonto) {
            case TipoPontoTelecom.CFTV:
                return TipoCaboUTP.BRANCO_CAT6;
            case TipoPontoTelecom.REDE:
                return TipoCaboUTP.AZUL_CAT6;
            case TipoPontoTelecom.VOIP:
                return TipoCaboUTP.AMARELO_CAT6;
        }

        return TipoCaboUTP.BRANCO_CAT6;
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
    static LC_DUPLO_MM_50_125 = "LC duplo MM 50x125µm";
    static LC_SIMPLES_MM_50_125 = "LC simples MM 50x125µm";
    static LC_DUPLO_SM_9_125 = "LC duplo SM 9x125µm";
    static LC_SIMPLES_SM_9_125 = "LC simples SM 9x125µm";

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

export enum TipoEquipamentoRack {
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
    METRO = 'metro',
    CAIXA = 'caixa',
    UNIDADE = 'unidade'
}

export enum TipoMicelanea {
    ETIQUETAS_IDENTIFICACAO,
    ABRACADEIRAS,
    PORCAS_GAIOLAS
}

export class TipoFibraOptica {
    static FOMMIG_50_125 = 'FOMMIG 50 x 125µm';
    static FOSM_9_125 = 'FOSM 9 x 125µm';

    static getTipoFibra(distancia: number) : TipoFibraOptica {
        if(distancia <= 300)
            return  TipoFibraOptica.FOMMIG_50_125;

        return  TipoFibraOptica.FOSM_9_125;
    }

    static getValue(value: string): TipoFibraOptica {
        if (value === TipoFibraOptica.FOMMIG_50_125)
            return TipoFibraOptica.FOMMIG_50_125;

        return TipoFibraOptica.FOSM_9_125;
    }
}