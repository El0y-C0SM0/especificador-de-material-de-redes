import { SEQForms } from "./src/exports/formsExports.js";
import { InputInt } from "./src/exports/formsExports.js";
import { gerarTabela } from "./src/exports/servicesExports.js";

var gerarTabelaBtn = document.getElementById('gerar-tabela-btn');

var seqs = [];
let nSeqPrincipal = undefined;

$('input[name="seq-secundaria"]').change(function() {

  $('#formulario').empty();
  seqs = [];
  $('#formulario').removeClass('hidden');
  nSeqPrincipal = undefined;
  
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
    
    nSeqPrincipal = new InputInt(
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
        let novaSEQ = new SEQForms(seqs.length);
        
        seqs.push(novaSEQ);
        novaSEQ.$element.appendTo("#formulario");
      }

      $("#seq-principal-input").attr("max", quantidadeSEQs);

      if (parseInt($("#seq-principal-input").val()) > quantidadeSEQs)
        $("#seq-principal-input").val(quantidadeSEQs);
    });

    quantidadeSEQInput.$element.appendTo("#setup");
    nSeqPrincipal.$element.appendTo("#setup");

    seqs.push(new SEQForms(0));
  } else {
    $("#numero-seqs-input-input-group").remove();
    $("#seq-principal-input-input-group").remove();
    
    seqs.push(new SEQForms(-1));
  }
  
  seqs[0].$element.appendTo('#formulario');
  $('body')[0].offsetHeight; // força o recálculo do tamanho do body
});

gerarTabelaBtn.addEventListener('click', function(){
  gerarTabela(seqs, nSeqPrincipal);
});
//gerarTabelaBtn.addEventListener('click', gerarTabela(seqs, nSeqPrincipal));

//$('#gerar-tabela-btn').on('click', gerarTabela(seqs, nSeqPrincipal));