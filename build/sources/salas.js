var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SalaDeEquipamentos = exports.SalaDeTelecom = exports.AreaDeTrabalho = void 0;
    var AreaDeTrabalho = /** @class */ (function () {
        function AreaDeTrabalho() {
            this.patchCords = [];
            this.pontosTelecom = [];
            this.tomadasFemeas = null;
            this.numEtiquetas = 0;
        }
        Object.defineProperty(AreaDeTrabalho.prototype, "numeroDiciplinas", {
            get: function () {
                return this.pontosTelecom == null ? 0 : this.pontosTelecom.length;
            },
            enumerable: false,
            configurable: true
        });
        return AreaDeTrabalho;
    }());
    exports.AreaDeTrabalho = AreaDeTrabalho;
    var UnidadeDeRede = /** @class */ (function () {
        function UnidadeDeRede() {
        }
        return UnidadeDeRede;
    }());
    var SalaDeTelecom = /** @class */ (function (_super) {
        __extends(SalaDeTelecom, _super);
        function SalaDeTelecom(areaDeTrabalho) {
            var _this = _super.call(this) || this;
            _this.areaDeTrabalho = areaDeTrabalho;
            _this.distanciaPontos = 0;
            _this.rackAberto = false;
            _this.altura = 0;
            _this.pigtails = [];
            _this.cordoes = [];
            return _this;
        }
        return SalaDeTelecom;
    }(UnidadeDeRede));
    exports.SalaDeTelecom = SalaDeTelecom;
    var SalaDeEquipamentos = /** @class */ (function (_super) {
        __extends(SalaDeEquipamentos, _super);
        function SalaDeEquipamentos() {
            var _this = _super.call(this) || this;
            _this.salasDeTelecom = [];
            _this.rackAberto = false;
            _this.pigtails = [];
            _this.cordoes = [];
            return _this;
        }
        return SalaDeEquipamentos;
    }(UnidadeDeRede));
    exports.SalaDeEquipamentos = SalaDeEquipamentos;
});
//# sourceMappingURL=salas.js.map