import { loadAreaDeTrabalho, loadRacks, 
    loadSEQ, loadTelecom 
} from "./../exports/servicesExports.js";

import { TabelaForms as Tabela } from "../exports/formsExports.js";

export default gerarTabela;

function gerarTabela(seqs_, nSeqPrincipal) {

    $("#tabelas").empty();
    let seqs = seqs_.map(sala => sala.carregarSEQ(undefined));

    if (nSeqPrincipal != undefined && nSeqPrincipal.isValid)
        seqs[nSeqPrincipal.value - 1] = seqs_[nSeqPrincipal.value - 1].carregarSEQ(seqs);

    // section tabela da area de trabalho
    let tabelaAreaDeTrabalho = new Tabela(
        "Área de trabalho", 
        "tabela-area-de-trabalho", 
        "Itens quantificados na área de trabalho.", 
        loadAreaDeTrabalho(seqs)
    );
    tabelaAreaDeTrabalho.$element.appendTo("#tabelas");

    // section tabela das salas de telecom
    let tabelaSalasDeTelecom = new Tabela(
        "Salas de Telecomunicações",
        "tabela-sala-telecom",
        "Itens quantificados nas salas de telecomunicações",
        loadTelecom(seqs)
    );
    tabelaSalasDeTelecom.$element.appendTo("#tabelas");

    // section tabela das salas de equipamentos
    let tabelaSalasDeEquipamentos = new Tabela(
        "Salas de Equipamentos",
        "tabela-sala-equipamentos",
        "Itens quantificados nas salas de equipamentos",
        loadSEQ(seqs)
    );
    tabelaSalasDeEquipamentos.$element.appendTo("#tabelas");

    // section tabela com os componentes do rack
    let tabelaRacks = new Tabela(
        "Racks",
        "tabela-racks",
        "Itens quantificados nos racks",
        loadRacks(seqs)
    );
    tabelaRacks.$element.appendTo("#tabelas");

}