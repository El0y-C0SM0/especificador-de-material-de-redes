define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaDeTrabalho = void 0;
    var AreaDeTrabalho = /** @class */ (function () {
        function AreaDeTrabalho() {
            this.patchCords = [];
            this.pontosTelecom = [];
            this.tomadasFemeas = null;
            this.numEtiquetas = 0;
        }
        Object.defineProperty(AreaDeTrabalho.prototype, "diciplinas", {
            get: function () {
                return this.pontosTelecom == null ? 0 : this.pontosTelecom.length;
            },
            enumerable: false,
            configurable: true
        });
        return AreaDeTrabalho;
    }());
    exports.AreaDeTrabalho = AreaDeTrabalho;
});
//# sourceMappingURL=area_trabalho.js.map