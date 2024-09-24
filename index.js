import { PavimentoForm, SalaDeEquipamentosForm } from "./src/forms/components.js";
import { InputInt, SelectField } from "./src/forms/inputs.js";
import { Tabela } from "./src/forms/tables.js";
import { Componente } from "./src/models/componente.js";
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

function loadLinhasAreaDeTrabalho(salasDeEquipamentos) {
  let salasDeTelecom = [];
  salasDeEquipamentos.forEach(seq => salasDeTelecom = salasDeTelecom.concat(seq.salasDeTelecom));
  let areasDeTrabalho = salasDeTelecom.map(sala => sala.areaDeTrabalho);

  let conectoresFemeas = new Tabela.LinhaTabela(tps.TipoConector.CAT6, 0, tps.TipoUnidadeQuantidades.UNIDADE);
  let patchCords = new Map();
  let micelaneasAreaDeTrabalho = new Map();

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
    area.micelaneas.forEach(micelanea => {
      let prev = micelaneasAreaDeTrabalho.get(micelanea.tipo);

      if (prev == undefined)
        micelaneasAreaDeTrabalho.set(micelanea.tipo, micelanea);
      else {
        prev.quantidade += micelanea.quantidade;
        micelaneasAreaDeTrabalho.set(prev.tipo, prev);
      }
    });
  });

  let patchCordsLinhas = Array.from(patchCords.values()).map(patchCord => {
    return new Tabela.LinhaTabela(
      `Patch cord ${patchCord.tipo} 3 metros`,
      patchCord.quantidade,
      patchCord.unidade
  )});

  let micelaneasAreaDeTrabalhoLinhas = Array.from(micelaneasAreaDeTrabalho.values()).map(micelanea => {
    return new Tabela.LinhaTabela(
      micelanea.tipo,
      micelanea.quantidade,
      micelanea.unidade
  )});

  return [
    conectoresFemeas,
    ...patchCordsLinhas,
    ...micelaneasAreaDeTrabalhoLinhas
  ];
}

function loadLinhasSalasDeTelecom(salasDeEquipamentos) {
  let salasDeTelecom = [];
  salasDeEquipamentos.forEach(seq => salasDeTelecom = salasDeTelecom.concat(seq.salasDeTelecom));

  let comprimentoMalhaHorizontal = 0;
  let pigtails = new Map();
  let cordoes = new Map();
  let acopladores = new Map();
  let micelaneas = new Map();
  let jumperCables = new Componente(0, tps.TipoUnidadeQuantidades.UNIDADE, tps.TipoCaboUTP.CINZA_CAT7);

  salasDeTelecom.forEach(sala => {
    comprimentoMalhaHorizontal += sala.comprimentoMalhaHorizontal;

    sala.pigtails.forEach(pigtail => {
      let prev = pigtails.get(pigtail.tipo);
    
      if (prev == undefined)
        pigtails.set(pigtail.tipo, pigtail);
      else {
        prev.quantidade += pigtail.quantidade;
        pigtails.set(prev.tipo, prev);
      }
    });

    sala.cordoes.forEach(cordao => {
      let prev = cordoes.get(cordao.tipo);
    
      if (prev == undefined)
        cordoes.set(cordao.tipo, cordao);
      else {
        prev.quantidade += cordao.quantidade;
        cordoes.set(prev.tipo, prev);
      }
    });

    sala.acopladores.forEach(acoplador => {
      let prev = acopladores.get(acoplador.tipo);
    
      if (prev == undefined)
        acopladores.set(acoplador.tipo, acoplador);
      else {
        prev.quantidade += acoplador.quantidade;
        acopladores.set(prev.tipo, prev);
      }
    });

    sala.micelaneas.forEach(micelanea => {
      let prev = micelaneas.get(micelanea.tipo);

      if (prev == undefined)
        micelaneas.set(micelanea.tipo, micelanea);
      else {
        prev.quantidade += micelanea.quantidade;
        micelaneas.set(prev.tipo, prev);
      }
    });

    jumperCables.quantidade += sala.jumperCables.quantidade;
  });

  const pigtailsLinhas = Array.from(pigtails.values()).map(pigtail => {
    return new Tabela.LinhaTabela(
      `Pigtail ${pigtail.tipo}`,
      pigtail.quantidade,
      pigtail.unidade
    )
  });

  const cordoesLinhas = Array.from(cordoes.values()).map(cordao => {
    return new Tabela.LinhaTabela(
      `Cordao ${cordao.tipo}`,
      cordao.quantidade,
      cordao.unidade
    )
  });

  const acopladoresLinhas = Array.from(acopladores.values()).map(acoplador => {
    return new Tabela.LinhaTabela(
      `Acoplador ${acoplador.tipo}`,
      acoplador.quantidade,
      acoplador.unidade
    )
  });

  const malhaHorizontalLinha = new Tabela.LinhaTabela(
    `MH ${tps.TipoCaboUTP.BRANCO_CAT6}`,
    Math.ceil(comprimentoMalhaHorizontal / 305),
    tps.TipoUnidadeQuantidades.CAIXA
  );

  const micelaneasLinhas = Array.from(micelaneas.values()).map(micelanea => {
    return new Tabela.LinhaTabela(
      micelanea.tipo,
      micelanea.quantidade,
      micelanea.unidade
  )});

  const jumperCablesLinhas = new Tabela.LinhaTabela(
    `Jumper cable ${jumperCables.tipo}`,
    jumperCables.quantidade,
    jumperCables.unidade
  );

  salasDeEquipamentos.forEach(sala => console.log(sala.pigtails));

  return [
    malhaHorizontalLinha,
    jumperCablesLinhas,
    ...pigtailsLinhas,
    ...cordoesLinhas,
    ...acopladoresLinhas,
    ...micelaneasLinhas,
  ]
}

function loadLinhasSalasDeEquipamentos(salasDeEquipamentos) {
  let comprimentoMalhaHorizontal = 0;
  let pigtails = new Map();
  let cordoes = new Map();
  let acopladores = new Map();
  let micelaneas = new Map();
  let jumperCables = new Componente(0, tps.TipoUnidadeQuantidades.UNIDADE, tps.TipoCaboUTP.CINZA_CAT7);

  salasDeEquipamentos.forEach(sala => {
    comprimentoMalhaHorizontal += sala.comprimentoMalhaHorizontal;

    sala.pigtails.forEach(pigtail => {
      let prev = pigtails.get(pigtail.tipo);
    
      if (prev == undefined)
        pigtails.set(pigtail.tipo, pigtail);
      else {
        prev.quantidade += pigtail.quantidade;
        pigtails.set(prev.tipo, prev);
      }
    });

    sala.cordoes.forEach(cordao => {
      let prev = cordoes.get(cordao.tipo);
    
      if (prev == undefined)
        cordoes.set(cordao.tipo, cordao);
      else {
        prev.quantidade += cordao.quantidade;
        cordoes.set(prev.tipo, prev);
      }
    });

    sala.acopladores.forEach(acoplador => {
      let prev = acopladores.get(acoplador.tipo);
    
      if (prev == undefined)
        acopladores.set(acoplador.tipo, acoplador);
      else {
        prev.quantidade += acoplador.quantidade;
        acopladores.set(prev.tipo, prev);
      }
    });

    sala.micelaneas.forEach(micelanea => {
      let prev = micelaneas.get(micelanea.tipo);

      if (prev == undefined)
        micelaneas.set(micelanea.tipo, micelanea);
      else {
        prev.quantidade += micelanea.quantidade;
        micelaneas.set(prev.tipo, prev);
      }
    });

    jumperCables.quantidade += sala.jumperCables.quantidade;
  });

  const pigtailsLinhas = Array.from(pigtails.values()).map(pigtail => {
    return new Tabela.LinhaTabela(
      `Pigtail ${pigtail.tipo}`,
      pigtail.quantidade,
      pigtail.unidade
    )
  });

  const cordoesLinhas = Array.from(cordoes.values()).map(cordao => {
    return new Tabela.LinhaTabela(
      `Cordao ${cordao.tipo}`,
      cordao.quantidade,
      cordao.unidade
    )
  });

  const acopladoresLinhas = Array.from(acopladores.values()).map(acoplador => {
    return new Tabela.LinhaTabela(
      `Acoplador ${acoplador.tipo}`,
      acoplador.quantidade,
      acoplador.unidade
    )
  });

  const malhaHorizontalLinha = new Tabela.LinhaTabela(
    `MH ${tps.TipoCaboUTP.BRANCO_CAT6}`,
    Math.ceil(comprimentoMalhaHorizontal / 305),
    tps.TipoUnidadeQuantidades.CAIXA
  );

  const micelaneasLinhas = Array.from(micelaneas.values()).map(micelanea => {
    return new Tabela.LinhaTabela(
      micelanea.tipo,
      micelanea.quantidade,
      micelanea.unidade
  )});

  const jumperCablesLinhas = new Tabela.LinhaTabela(
    `Jumper cable ${jumperCables.tipo}`,
    jumperCables.quantidade,
    jumperCables.unidade
  );

  salasDeEquipamentos.forEach(sala => console.log(sala.pigtails));

  return [
    malhaHorizontalLinha,
    jumperCablesLinhas,
    ...pigtailsLinhas,
    ...cordoesLinhas,
    ...acopladoresLinhas,
    ...micelaneasLinhas,
  ]
}

$('#gerar-tabela-btn').on('click', () => {
  $("#tabelas").empty();

  let salasDeEquipamentos = seqs.map(sala => sala.carregarSalaEquipamentos());

  // section tabela da area de trabalho
  let tabelaAreaDeTrabalho = new Tabela(
    "Área de trabalho", 
    "tabela-area-de-trabalho", 
    "Itens quantificados na área de trabalho.", 
    loadLinhasAreaDeTrabalho(salasDeEquipamentos)
  );
  tabelaAreaDeTrabalho.$element.appendTo("#tabelas");

  // section tabela das salas de telecom
  let tabelaSalasDeTelecom = new Tabela(
    "Salas de Telecomunicações",
    "tabela-sala-telecom",
    "Itens quantificados nas salas de telecomunicações",
    loadLinhasSalasDeTelecom(salasDeEquipamentos)
  );
  tabelaSalasDeTelecom.$element.appendTo("#tabelas");

  // section tabela das salas de equipamentos
  let tabelaSalasDeEquipamentos = new Tabela(
    "Salas de Equipamentos",
    "tabela-sala-equipamentos",
    "Itens quantificados nas salas de equipamentos",
    loadLinhasSalasDeEquipamentos(salasDeEquipamentos)
  );
  tabelaSalasDeEquipamentos.$element.appendTo("#tabelas");
})