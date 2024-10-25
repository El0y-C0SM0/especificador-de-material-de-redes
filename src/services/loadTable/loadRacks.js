import { TabelaForms as Tabela } from "../../exports/formsExports.js";
import { TiposModels as tps } from "../../exports/modelsExports.js";

export default loadRacks;

function loadRacks(salasDeEquipamentos) {
    let salasDeTelecom = [];
    salasDeEquipamentos.forEach(seq => salasDeTelecom = salasDeTelecom.concat(seq.salasDeTelecom));
  
    let salas = [...salasDeEquipamentos, ...salasDeTelecom];
  
    let racks = new Map();
    let equipamentos = new Map();
    let componentes = new Map();
    let micelaneas = new Map();
  
    salas.forEach(sala => {
      let racksSala = sala.racks;
  
      if(racksSala == undefined)
        return;

      racksSala.forEach(rack => {
        let prevRack = racks.get(`Rack ${rack.altura}U ${rack.aberto ? 'aberto' : 'fechado'}`);
  
        if (prevRack == undefined) 
          racks.set(`Rack ${rack.altura}U ${rack.aberto ? 'aberto' : 'fechado'}`, 1);
        else
          racks.set(`Rack ${rack.altura}U ${rack.aberto ? 'aberto' : 'fechado'}`, prevRack + 1);
  
        rack.equipamentos.forEach(equipamento => {
          let prev = equipamentos.get(equipamento.tipo);
  
          if (prev != undefined)
            equipamento.quantidade += prev.quantidade
          equipamentos.set(equipamento.tipo, equipamento);
        });
  
        rack.componentes.forEach(componente => {
          let prev = componentes.get(componente.tipo);
  
          if (prev != undefined)
            componente.quantidade += prev.quantidade
          componentes.set(componente.tipo, componente);
        });
        
        rack.micelaneas.forEach(micelanea => {
          let prev = micelaneas.get(micelanea.tipo);
  
          if (prev != undefined)
            micelanea.quantidade += prev.quantidade
          micelaneas.set(micelanea.tipo, micelanea);
        });
      });
    });
  
    const racksLinhas = Array.from(racks).map(([rack, quantidade]) => {
      return new Tabela.LinhaTabela(
        rack,
        quantidade,
        tps.TipoUnidadeQuantidades.UNIDADE
    )});
  
    const equipamentosLinhas = Array.from(equipamentos.values()).map(equipamento => {
      return new Tabela.LinhaTabela(
        `${equipamento.tipo} ${equipamento.alturaUnitaria}U`,
        equipamento.quantidade,
        tps.TipoUnidadeQuantidades.UNIDADE
    )});
  
    const componentesLinhas = Array.from(componentes.values()).map(componente => {
      return new Tabela.LinhaTabela(
        `${componente.tipo} ${componente.alturaUnitaria}U`,
        componente.quantidade,
        tps.TipoUnidadeQuantidades.UNIDADE
    )});
  
    const micelaneasLinhas = Array.from(micelaneas.values()).map(micelanea => {
      return new Tabela.LinhaTabela(
        micelanea.tipo,
        micelanea.quantidade,
        micelanea.unidade
    )});
  
    return [
      ...racksLinhas,
      ...equipamentosLinhas,
      ...componentesLinhas,
      ...micelaneasLinhas
    ]
}  