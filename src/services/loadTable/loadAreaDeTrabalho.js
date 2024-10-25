import { TabelaForms as Tabela } from "../../exports/formsExports.js";
import { TiposModels as tps } from "../../exports/modelsExports.js";

export default loadAreaDeTrabalho;

function loadAreaDeTrabalho(salasDeEquipamentos) {

    let salasDeTelecom = [];
    salasDeEquipamentos.forEach(seq => salasDeTelecom = salasDeTelecom.concat(seq.salasDeTelecom));

    let areasDeTrabalho = salasDeTelecom.map(sala => sala.areaDeTrabalho);
    //salasDeEquipamentos.forEach(seq => areasDeTrabalho.push(seq.areaDeTrabalho));

    console.log(salasDeEquipamentos);
    console.log(salasDeTelecom);
    console.log(areasDeTrabalho);
  
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