import { TipoCaboUTP, TipoEquipamento } from './sources/tipos';

let inputTest = document.getElementById('teste') as HTMLInputElement;
let button = document.getElementById('btn') as HTMLButtonElement;


if(button != null && inputTest != null) {
    button.addEventListener('click', () => {
        console.log(TipoCaboUTP.AMARELO_CAT6);
        console.log(TipoEquipamento.SWITCH_24);
        console.log("TipoCaboUTP.AMARELO_CAT6");

        // alert(inputTest.value);
    });
}