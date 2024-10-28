import { 
    SEQPrimariaForms,
    SEQForms
} from "./../exports/formsExports.js";


function updateSetup(input) {

    $('#formulario').empty();
    $('#formulario').removeClass('hidden');

    if ($(input).val() === 'primario')
        return setBackbonePrimario();
    return setBackboneSecundario();

}

function setBackbonePrimario() {

    let $seq = new SEQPrimariaForms();
    $seq.$element.appendTo("#formulario");

    return updateForms($seq, true);

}

function setBackboneSecundario() {

    let $seq = new SEQForms();
    $seq.$element.appendTo("#formulario");

    return updateForms($seq, false);

}

function updateForms($seq, backbonePrimario) {

    $('body')[0].offsetHeight; // força o recálculo do tamanho do body
    return [$seq, backbonePrimario];

}

export default updateSetup;