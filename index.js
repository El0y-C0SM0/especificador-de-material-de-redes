import { PavimentoForm, SalaDeEquipamentosForm } from "./src/forms/components.js";
import { InputInt, SelectField } from "./src/forms/inputs.js";

let seqs = [];

$('input[name="seq-secundaria"]').change(function() {
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
      let $seqs = $("#formulario .seq");
      
      while (seqs.length > quantidadeSEQs) {
        seqs.pop();
        $seqs.last().remove();
      }
      
      while (seqs.length < quantidadeSEQs) {
        let novaSEQ = new SalaDeEquipamentosForm(seqs.length);
        
        seqs.push(novaSEQ);
        novaSEQ.$element.appendTo("#formulario");
      }
    })

    quantidadeSEQInput.$element.appendTo("#setup");
    console.log('O input de rádio com valor "com-seq-secundaria" está marcado!');
  }

  seqs.push(new SalaDeEquipamentosForm(0));
  seqs[0].$element.appendTo('#formulario');
});