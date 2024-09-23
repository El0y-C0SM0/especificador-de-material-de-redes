import { PavimentoForm, SalaDeEquipamentosForm } from "./src/forms/components.js";
import { InputInt, SelectField } from "./src/forms/inputs.js";
import { Tabela } from "./src/forms/tables.js";
import * as tps from "./src/models/tipos.js";

var seqs = [];

console.log(tps.TipoConector.CAT6);

$('input[name="seq-secundaria"]').change(function() {
  $('#formulario').empty();
  seqs = [];
  $('#formulario').removeClass('hidden');
  
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
    
    let numeroSEQPrincipalInput = new InputInt(
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
        let novaSEQ = new SalaDeEquipamentosForm(seqs.length);
        
        seqs.push(novaSEQ);
        novaSEQ.$element.appendTo("#formulario");
      }

      $("#seq-principal-input").attr("max", quantidadeSEQs);

      if (parseInt($("#seq-principal-input").val()) > quantidadeSEQs)
        $("#seq-principal-input").val(quantidadeSEQs);
    });

    quantidadeSEQInput.$element.appendTo("#setup");
    numeroSEQPrincipalInput.$element.appendTo("#setup");

    seqs.push(new SalaDeEquipamentosForm(0));
  } else {
    $("#numero-seqs-input-input-group").remove();
    $("#seq-principal-input-input-group").remove();
    
    seqs.push(new SalaDeEquipamentosForm(-1));
  }
  
  seqs[0].$element.appendTo('#formulario');
  $('body')[0].offsetHeight; // força o recálculo do tamanho do body
});

$('#gerar-tabela-btn').on('click', () => {
  $("#tabelas").empty();

  let salasDeEquipamentos = seqs.map(sala => sala.carregarSalaEquipamentos());
  let salasDeTelecom = [];
  
  salasDeEquipamentos.forEach(seq => salasDeTelecom = salasDeTelecom.concat(seq.salasDeTelecom));
  let areasDeTrabalho = salasDeTelecom.map(sala => sala.areaDeTrabalho);

  let conectoresFemeas = new Tabela.LinhaTabela(tps.TipoConector.CAT6, 0, tps.TipoUnidadeQuantidades.UNIDADE);
  let patchCords = new Map();
  // patchCords = Map();

  areasDeTrabalho.forEach(area => {
    conectoresFemeas.quantidade += area.tomadasFemeas.quantidade;
    area.patchCords.forEach(patchCord => {
      let prev = patchCords.get(patchCord.tipo);
      
      if (prev == undefined) 
        patchCords.set(patchCord.tipo, patchCord);
      else {
        prev.quantidade += patchCord.quantidade;

        patchCords.set(patchCord.tipo, prev);
      }
    });
  });

  let patchCordsLinhas = Array.from(patchCords.values()).map(patchCord => {
    return new Tabela.LinhaTabela(
      `Patch cord ${patchCord.tipo}`,
      patchCord.quantidade,
      patchCord.unidade
  )});


  let linhaTeste = [
    conectoresFemeas,
    ...patchCordsLinhas,
  ];

  let tabelaTeste = new Tabela(
    "Área de trabalho", 
    "tabela-area-de-trabalho", 
    "Itens quantificados na área de trabalho.", 
    linhaTeste
  );

  tabelaTeste.$element.appendTo("#tabelas");
})