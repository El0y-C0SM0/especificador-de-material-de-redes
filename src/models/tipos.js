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
    TipoEquipamentoRack["PATCH_PANEL_24"] = "Patch panel 24 portas";
    TipoEquipamentoRack["PATCH_PANEL"] = "Patch panel";
    TipoEquipamentoRack["SWITCH_24"] = "Switch 24 portas";
    TipoEquipamentoRack["DIO_24"] = "DIO 24 portas";
    TipoEquipamentoRack["DIO_24_4"] = "DIO 24 portas 4 cabos";
    TipoEquipamentoRack["TERMINADOR_OPTICO"] = "Terminador \u00F3ptico";
    TipoEquipamentoRack["SVR_24"] = "SVR 24 portas";
    TipoEquipamentoRack["EXAUSTOR"] = "Exaustor";
    TipoEquipamentoRack["NO_BREAK"] = "No break";
})(TipoEquipamentoRack || (TipoEquipamentoRack = {}));
export var TipoComponenteRack;
(function (TipoComponenteRack) {
    TipoComponenteRack["BANDEJA_FIXA"] = "Bandeja fixa";
    TipoComponenteRack["BANDEJA_DESLIZANTE"] = "Bandeja deslizante";
    TipoComponenteRack["ORGANIZADOR_FRONTAL"] = "Organizador frontal";
    TipoComponenteRack["BANDEJA_DE_EMENDA_12"] = "Bandeja de emenda 12 fibras";
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
    TipoMicelanea["ABRACADEIRAS"] = "Abra\u00E7adeiras";
    TipoMicelanea["PORCAS_GAIOLAS"] = "Porcas gaiolas";
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