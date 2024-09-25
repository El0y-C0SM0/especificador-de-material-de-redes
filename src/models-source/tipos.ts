export enum TipoCaboUTP {
    AZUL_CAT6 = 'azul CAT6',
    VERMELHO_CAT6 = 'vermelho CAT6',
    AMARELO_CAT6 = 'amarelo CAT6',
    BRANCO_CAT6 = 'branco CAT6',
    CINZA_CAT7 = 'cinza CAT7'
};

export enum TipoConector {
    CAT6 = 'Conector femêa CAT6'
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
    PATCH_PANEL_24 = "Patch panel 24 portas",
    PATCH_PANEL = "Patch panel",
    SWITCH_24 = "Switch 24 portas",
    DIO_24 = "DIO 24 portas",
    DIO_24_4 = "DIO 24 portas 4 cabos",
    TERMINADOR_OPTICO = "Terminador óptico",
    SVR_24 = "SVR 24 portas",
    EXAUSTOR = "Exaustor",
    NO_BREAK = "No break",
}

export enum TipoComponenteRack {
    BANDEJA_FIXA = "Bandeja fixa",
    BANDEJA_DESLIZANTE = "Bandeja deslizante",
    ORGANIZADOR_FRONTAL = "Organizador frontal",
    BANDEJA_DE_EMENDA_12 = "Bandeja de emenda 12 fibras"
}

export enum TipoUnidadeQuantidades {
    METRO = "metro",
    CAIXA = "caixa",
    UNIDADE = "unidade"
}

export enum TipoMicelanea {
    ETIQUETAS_IDENTIFICACAO = "Etiquetas de identificação",
    ABRACADEIRAS = "Abraçadeiras",
    PORCAS_GAIOLAS = "Porcas gaiolas",
}

export class TipoFibraOptica {
    static FOMMIG_50_125 = "FOMMIG 50 x 125µm";
    static FOSM_9_125 = "FOSM 9 x 125µm";

    static getTipoFibra(distancia: number) : TipoFibraOptica {
        if(distancia <= 300)
            return  TipoFibraOptica.FOMMIG_50_125;

        return  TipoFibraOptica.FOSM_9_125;
    }
}