import { PavimentoForm, SalaDeEquipamentosForm } from "./src/forms/components.js";
import { InputInt, SelectField } from "./src/forms/inputs.js";


$('input[name="seq-secundaria"]').change(function() {
  let seqs = [];
  $('#formulario').empty();
  
  if ($(this).val() === 'com-seq-secundaria') {
    let quantidadeSEQInput = new InputInt(
      "Número de salas de equipamento:",
      "numero-seqs-input",
      1,
      24,
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
        let novaSEQ = new SalaDeEquipamentosForm(seqs.length);
        
        seqs.push(novaSEQ);
        novaSEQ.$element.appendTo("#formulario");
      }
    })

    quantidadeSEQInput.$element.appendTo("#setup");

    seqs.push(new SalaDeEquipamentosForm(0));
  } else {
    $("#numero-seqs-input").remove();
    $("#numero-seqs-input-label").remove();
    seqs.push(new SalaDeEquipamentosForm(-1));
  }
  
  seqs[0].$element.appendTo('#formulario');
  $('body')[0].offsetHeight; // força o recálculo do tamanho do body
});