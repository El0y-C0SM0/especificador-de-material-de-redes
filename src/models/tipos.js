export var TipoCaboUTP;
(function (TipoCaboUTP) {
    TipoCaboUTP[TipoCaboUTP["AZUL_CAT6"] = 0] = "AZUL_CAT6";
    TipoCaboUTP[TipoCaboUTP["VERMELHO_CAT6"] = 1] = "VERMELHO_CAT6";
    TipoCaboUTP[TipoCaboUTP["AMARELO_CAT6"] = 2] = "AMARELO_CAT6";
    TipoCaboUTP[TipoCaboUTP["BRANCO_CAT6"] = 3] = "BRANCO_CAT6";
    TipoCaboUTP[TipoCaboUTP["CINZA_CAT7"] = 4] = "CINZA_CAT7";
})(TipoCaboUTP || (TipoCaboUTP = {}));
;
export var TipoConector;
(function (TipoConector) {
    TipoConector[TipoConector["CAT6"] = 0] = "CAT6";
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
TipoPontoTelecom.REDE = 0;
TipoPontoTelecom.CFTV = 1;
TipoPontoTelecom.VOIP = 2;
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
TipoAcopladorPigtailCordao.LC_DUPLO_MM_50_125 = 0;
TipoAcopladorPigtailCordao.LC_SIMPLES_MM_50_125 = 1;
TipoAcopladorPigtailCordao.LC_DUPLO_SM_9_125 = 2;
TipoAcopladorPigtailCordao.LC_SIMPLES_SM_9_125 = 3;
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
    TipoUnidadeQuantidades[TipoUnidadeQuantidades["METRO"] = 0] = "METRO";
    TipoUnidadeQuantidades[TipoUnidadeQuantidades["CAIXA"] = 1] = "CAIXA";
    TipoUnidadeQuantidades[TipoUnidadeQuantidades["UNIDADE"] = 2] = "UNIDADE";
})(TipoUnidadeQuantidades || (TipoUnidadeQuantidades = {}));
export var TipoMicelanea;
(function (TipoMicelanea) {
    TipoMicelanea[TipoMicelanea["ETIQUETAS_IDENTIFICACAO"] = 0] = "ETIQUETAS_IDENTIFICACAO";
    TipoMicelanea[TipoMicelanea["ABRACADEIRAS"] = 1] = "ABRACADEIRAS";
    TipoMicelanea[TipoMicelanea["PORCAS_GAIOLAS"] = 2] = "PORCAS_GAIOLAS";
})(TipoMicelanea || (TipoMicelanea = {}));
export class TipoFibraOptica {
    static getTipoFibra(distancia) {
        if (distancia <= 300)
            return TipoFibraOptica.FOMMIG_50_125;
        return TipoFibraOptica.FOSM_9_125;
    }
}
TipoFibraOptica.FOMMIG_50_125 = 0;
TipoFibraOptica.FOSM_9_125 = 1;
//# sourceMappingURL=tipos.js.map