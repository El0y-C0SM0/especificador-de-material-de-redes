import { TabelaForms as Tabela } from "../../exports/formsExports.js";
import { ComponenteModel as Componente} from "../../exports/modelsExports.js";
import { TiposModels as tps } from "../../exports/modelsExports.js";

export default loadTelecom;

function loadTelecom(seqs) {
    let salasDeTelecom = [];
    seqs.forEach(seq => salasDeTelecom = salasDeTelecom.concat(seq.salasDeTelecom));
  
    let comprimentoMalhaHorizontal = 0;
    let pigtails = new Map();
    let cordoes = new Map();
    let acopladores = new Map();
    let micelaneas = new Map();
    let patchCables = new Map();
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
  
      sala.patchCables.forEach(patchCable => {
        let prev = patchCables.get(patchCable.tipo);
  
        if (prev != undefined)
          patchCable.quantidade += prev.quantidade;
  
        patchCables.set(patchCable.tipo, patchCable);
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
  
    const patchCablesLinhas = Array.from(patchCables.values()).map(patchCable => {
      return new Tabela.LinhaTabela(
        `Patch Cable ${patchCable.tipo} 3 metros`,
        patchCable.quantidade,
        patchCable.unidade
    )});
  
    const jumperCablesLinhas = new Tabela.LinhaTabela(
      `Jumper cable ${jumperCables.tipo}`,
      jumperCables.quantidade,
      jumperCables.unidade
    );
  
    return [
      malhaHorizontalLinha,
      ...patchCablesLinhas,
      jumperCablesLinhas,
      ...pigtailsLinhas,
      ...cordoesLinhas,
      ...acopladoresLinhas,
      ...micelaneasLinhas,
    ]
}