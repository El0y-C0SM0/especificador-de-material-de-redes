export var TipoCaboUTP;
(function (TipoCaboUTP) {
    TipoCaboUTP["AZUL_CAT6"] = "azul CAT6";
    TipoCaboUTP["VERMELHO_CAT6"] = "vermelho CAT6";
    TipoCaboUTP["AMARELO_CAT6"] = "amarelo CAT6";
    TipoCaboUTP["BRANCO_CAT6"] = "branco CAT6";
    TipoCaboUTP["CINZA_CAT7"] = "cinza CAT7";
})(TipoCaboUTP || (TipoCaboUTP = {}));
;
export var TipoConector;
(function (TipoConector) {
    TipoConector["CAT6"] = "Conector fem\u00EAa CAT6";
})(TipoConector || (TipoConector = {}));
;
export class TipoPontoTelecom {
    static toTipoPatchCord(tipoPonto) {
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
    static toTipoPatchCable(tipoPonto) {
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
TipoPontoTelecom.REDE = "Rede";
TipoPontoTelecom.CFTV = "CFTV";
TipoPontoTelecom.VOIP = "VoIP";
export class TipoAcopladorPigtailCordao {
    static getTipo(tipo, duplo) {
        if (tipo == TipoFibraOptica.FOMMIG_50_125) {
            if (duplo)
                return TipoAcopladorPigtailCordao.LC_DUPLO_MM_50_125;
            else
                return TipoAcopladorPigtailCordao.LC_DUPLO_MM_50_125;
        }
        else {
            if (duplo)
                return TipoAcopladorPigtailCordao.LC_SIMPLES_SM_9_125;
            else
                return TipoAcopladorPigtailCordao.LC_SIMPLES_SM_9_125;
        }
    }
}
TipoAcopladorPigtailCordao.LC_DUPLO_MM_50_125 = "LC duplo MM 50x125µm";
TipoAcopladorPigtailCordao.LC_SIMPLES_MM_50_125 = "LC simples MM 50x125µm";
TipoAcopladorPigtailCordao.LC_DUPLO_SM_9_125 = "LC duplo SM 9x125µm";
TipoAcopladorPigtailCordao.LC_SIMPLES_SM_9_125 = "LC simples SM 9x125µm";
export var TipoEquipamentoRack;
(function (TipoEquipamentoRack) {
    TipoEquipamentoRack[TipoEquipamentoRack["PATCH_PANEL_24"] = 0] = "PATCH_PANEL_24";
    TipoEquipamentoRack[TipoEquipamentoRack["PATCH_PANEL"] = 1] = "PATCH_PANEL";
    TipoEquipamentoRack[TipoEquipamentoRack["SWITCH_24"] = 2] = "SWITCH_24";
    TipoEquipamentoRack[TipoEquipamentoRack["DIO_24"] = 3] = "DIO_24";
    TipoEquipamentoRack[TipoEquipamentoRack["DIO_24_4"] = 4] = "DIO_24_4";
    TipoEquipamentoRack[TipoEquipamentoRack["TERMINADOR_OPTICO"] = 5] = "TERMINADOR_OPTICO";
    TipoEquipamentoRack[TipoEquipamentoRack["SVR_24"] = 6] = "SVR_24";
    TipoEquipamentoRack[TipoEquipamentoRack["EXAUSTOR"] = 7] = "EXAUSTOR";
    TipoEquipamentoRack[TipoEquipamentoRack["NO_BREAK"] = 8] = "NO_BREAK";
})(TipoEquipamentoRack || (TipoEquipamentoRack = {}));
export var TipoComponenteRack;
(function (TipoComponenteRack) {
    TipoComponenteRack[TipoComponenteRack["BANDEJA_FIXA"] = 0] = "BANDEJA_FIXA";
    TipoComponenteRack[TipoComponenteRack["BANDEJA_DESLIZANTE"] = 1] = "BANDEJA_DESLIZANTE";
    TipoComponenteRack[TipoComponenteRack["ORGANIZADOR_FRONTAL"] = 2] = "ORGANIZADOR_FRONTAL";
    TipoComponenteRack[TipoComponenteRack["BANDEJA_DE_EMENDA_12"] = 3] = "BANDEJA_DE_EMENDA_12";
})(TipoComponenteRack || (TipoComponenteRack = {}));
export var TipoUnidadeQuantidades;
(function (TipoUnidadeQuantidades) {
    TipoUnidadeQuantidades["METRO"] = "metro";
    TipoUnidadeQuantidades["CAIXA"] = "caixa";
    TipoUnidadeQuantidades["UNIDADE"] = "unidade";
})(TipoUnidadeQuantidades || (TipoUnidadeQuantidades = {}));
export var TipoMicelanea;
(function (TipoMicelanea) {
    TipoMicelanea["ETIQUETAS_IDENTIFICACAO"] = "Etiquetas de identifica\u00E7\u00E3o";
    TipoMicelanea["ABRACADEIRAS"] = "abra\u00E7adeiras";
    TipoMicelanea["PORCAS_GAIOLAS"] = "porcas gaiolas";
})(TipoMicelanea || (TipoMicelanea = {}));
export class TipoFibraOptica {
    static getTipoFibra(distancia) {
        if (distancia <= 300)
            return TipoFibraOptica.FOMMIG_50_125;
        return TipoFibraOptica.FOSM_9_125;
    }
}
TipoFibraOptica.FOMMIG_50_125 = "FOMMIG 50 x 125µm";
TipoFibraOptica.FOSM_9_125 = "FOSM 9 x 125µm";
//# sourceMappingURL=tipos.js.map