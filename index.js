import { gerarTabela, updateSetup } from "./src/exports/servicesExports.js";


var gerarTabelaBtn = document.getElementById('gerar-tabela-btn');
var $seqPrincipal;
var backbonePrimario;

$('input[name="backbone"]').change(function() {

  [$seqPrincipal, backbonePrimario] = updateSetup(this);
  
});

gerarTabelaBtn.addEventListener('click', function(){

  gerarTabela($seqPrincipal, backbonePrimario);

});