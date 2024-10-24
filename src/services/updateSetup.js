import { 
    SEQForms, 
    InputInt 
} from "./../exports/formsExports.js";


function updateSetup(input) {

    let seqs = [];
    let seqPrincipal = undefined;

    $('#formulario').empty();
    $('#formulario').removeClass('hidden');

    if ($(input).val() === 'sem-seq-secundaria') {
        
        $("#numero-seqs-input-input-group").remove();
        $("#seq-principal-input-input-group").remove();
        
        updateForms([], undefined)
        return [], undefined;
    
    }
    
    seqs, seqPrincipal = setForMultipleSEQs(seqs, seqPrincipal);
    
    return updateForms(seqs, seqPrincipal);

}

function setForMultipleSEQs(seqs, seqPrincipal) {

    let quantidadeSEQInput = new InputInt(
    "Número de salas de equipamento:",
    "numero-seqs-input",
    1,
    24,
    1,
    false,
    1
    );
    
    seqPrincipal = new InputInt(
    "Número da sala de equipamentos principal:",
    "seq-principal-input",
    1,
    1,
    1,
    false,
    1
    );

    quantidadeSEQInput.onUpdate(quantidadeSEQs => {
    // let $seqs = $("#formulario .seq");
    
        while (seqs.length > quantidadeSEQs) {
            let last = seqs.pop();
            $('#' + last.id).remove();
        }
        
        while (seqs.length < quantidadeSEQs) {
            let novaseq = new SEQForms(seqs.length);
            
            seqs.push(novaseq);
            novaseq.$element.appendTo("#formulario");
        }

        $("#seq-principal-input").attr("max", quantidadeSEQs);

        if (parseInt($("#seq-principal-input").val()) > quantidadeSEQs)
            $("#seq-principal-input").val(quantidadeSEQs);

        console.log(seqs.length);

    });

    quantidadeSEQInput.$element.appendTo("#setup");
    seqPrincipal.$element.appendTo("#setup");

    seqs.push(new SEQForms(0));

    return seqs, seqPrincipal;

}

function updateForms(seqs, seqPrincipal) {


    seqs.push(new SEQForms(-1));
    seqs[0].$element.appendTo('#formulario');

    $('body')[0].offsetHeight; // força o recálculo do tamanho do body

    return seqs, seqPrincipal;

}

export default updateSetup;