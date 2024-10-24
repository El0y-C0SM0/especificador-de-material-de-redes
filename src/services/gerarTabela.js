import { loadAreaDeTrabalho, loadRacks, 
    loadSEQ, loadTelecom 
} from "./../exports/servicesExports.js";

import { TabelaForms as Tabela } from "../exports/formsExports.js";


function gerarTabela(seqs_, nSeqPrincipal) {

    $("#tabelas").empty();
    let seqs = seqs_.map(sala => sala.carregarSEQ(undefined));

    if (nSeqPrincipal != undefined && nSeqPrincipal.isValid)
        seqs[nSeqPrincipal.value - 1] = seqs_[nSeqPrincipal.value - 1].carregarSEQ(seqs);

    let tabelaAreaDeTrabalho, tabelaSalasDeTelecom, tabelaSalasDeEquipamentos, tabelaRacks;

    tabelaAreaDeTrabalho = new Tabela(
        "Área de trabalho", 
        "tabela-area-de-trabalho", 
        "Itens quantificados na área de trabalho.", 
        loadAreaDeTrabalho(seqs)
    );
    
    tabelaSalasDeTelecom = new Tabela(
        "Salas de Telecomunicações",
        "tabela-sala-telecom",
        "Itens quantificados nas salas de telecomunicações",
        loadTelecom(seqs)
    );

    tabelaSalasDeEquipamentos = new Tabela(
        "Salas de Equipamentos",
        "tabela-sala-equipamentos",
        "Itens quantificados nas salas de equipamentos",
        loadSEQ(seqs)
    );

    tabelaRacks = new Tabela(
        "Racks",
        "tabela-racks",
        "Itens quantificados nos racks",
        loadRacks(seqs)
    );

    tabelaAreaDeTrabalho.$element.appendTo("#tabelas");
    tabelaSalasDeTelecom.$element.appendTo("#tabelas");
    tabelaSalasDeEquipamentos.$element.appendTo("#tabelas");
    tabelaRacks.$element.appendTo("#tabelas");

}


export default gerarTabela;