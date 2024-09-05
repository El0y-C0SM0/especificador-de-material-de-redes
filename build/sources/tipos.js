define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TipoEquipamento = exports.TipoAcoplador = exports.TipoPigtailCordao = exports.TipoPontoTelecom = exports.TipoConector = exports.TipoCaboUTP = void 0;
    var TipoCaboUTP;
    (function (TipoCaboUTP) {
        TipoCaboUTP[TipoCaboUTP["AZUL_CAT6"] = 0] = "AZUL_CAT6";
        TipoCaboUTP[TipoCaboUTP["VERMELHO_CAT6"] = 1] = "VERMELHO_CAT6";
        TipoCaboUTP[TipoCaboUTP["AMARELO_CAT6"] = 2] = "AMARELO_CAT6";
        TipoCaboUTP[TipoCaboUTP["BRANCO_CAT6"] = 3] = "BRANCO_CAT6";
    })(TipoCaboUTP || (exports.TipoCaboUTP = TipoCaboUTP = {}));
    ;
    var TipoConector;
    (function (TipoConector) {
        TipoConector[TipoConector["CAT6"] = 0] = "CAT6";
    })(TipoConector || (exports.TipoConector = TipoConector = {}));
    ;
    var TipoPontoTelecom;
    (function (TipoPontoTelecom) {
        TipoPontoTelecom[TipoPontoTelecom["REDE"] = 0] = "REDE";
        TipoPontoTelecom[TipoPontoTelecom["CFTV"] = 1] = "CFTV";
        TipoPontoTelecom[TipoPontoTelecom["VOIP"] = 2] = "VOIP";
    })(TipoPontoTelecom || (exports.TipoPontoTelecom = TipoPontoTelecom = {}));
    // TODO definir melhor
    var TipoPigtailCordao;
    (function (TipoPigtailCordao) {
        TipoPigtailCordao[TipoPigtailCordao["LC_DUPLO"] = 0] = "LC_DUPLO";
        TipoPigtailCordao[TipoPigtailCordao["LC_SIMPLES"] = 1] = "LC_SIMPLES";
    })(TipoPigtailCordao || (exports.TipoPigtailCordao = TipoPigtailCordao = {}));
    var TipoAcoplador;
    (function (TipoAcoplador) {
        TipoAcoplador[TipoAcoplador["LC_DUPLO"] = 0] = "LC_DUPLO";
        TipoAcoplador[TipoAcoplador["LC_SIMPLES"] = 1] = "LC_SIMPLES";
    })(TipoAcoplador || (exports.TipoAcoplador = TipoAcoplador = {}));
    var TipoEquipamento;
    (function (TipoEquipamento) {
        TipoEquipamento[TipoEquipamento["PATCH_PANEL_24"] = 0] = "PATCH_PANEL_24";
        TipoEquipamento[TipoEquipamento["SWITCH_24"] = 1] = "SWITCH_24";
        TipoEquipamento[TipoEquipamento["DIO_24"] = 2] = "DIO_24";
    })(TipoEquipamento || (exports.TipoEquipamento = TipoEquipamento = {}));
});
//# sourceMappingURL=tipos.js.map