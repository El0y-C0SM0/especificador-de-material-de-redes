define(["require", "exports", "./sources/tipos"], function (require, exports, tipos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import * as tipo from './sources/tipos'
    var inputTest = document.getElementById('teste');
    var button = document.getElementById('btn');
    if (button != null && inputTest != null) {
        button.addEventListener('click', function () {
            console.log(tipos_1.TipoCaboUTP.AMARELO_CAT6);
            console.log(tipos_1.TipoEquipamento.SWITCH_24);
            console.log("TipoCaboUTP.AMARELO_CAT6");
            // alert(inputTest.value);
        });
    }
});
//# sourceMappingURL=index.js.map