import { gerarTabela, updateSetup } from "./src/exports/servicesExports.js";


var gerarTabelaBtn = document.getElementById('gerar-tabela-btn');
var seqs, seqPrincipal;


$('input[name="seq-secundaria"]').change(function() {

  [seqs, seqPrincipal] = updateSetup(this);
  
});

gerarTabelaBtn.addEventListener('click', function(){

  gerarTabela(seqs, seqPrincipal);

});