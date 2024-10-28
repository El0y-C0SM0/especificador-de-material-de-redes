import { TabelaForms as Tabela } from "../exports/formsExports";
import { loadPrimario,  loadSecundario } from "../exports/servicesExports";


function gerarTabela($seqPrincipal, backbonePrimario) {

    $("#tabelas").empty();
    if (backbonePrimario) gerarTabelaBackbonePrimario($seqPrincipal.carregarSEQPrimaria());
    else gerarTabelaBackboneSecundario($seqPrincipal.carregarSEQ());

}

function gerarTabelaBackbonePrimario(seqPrincipal) {

    let tabela;

    tabela = new Tabela(
        "Backbone óptico.", 
        "tabela-backbone-optico", 
        "Quantificação de materiais ópticos para a infraestrutura planejada.", 
        loadPrimario(seqPrincipal)
    )

    tabela.$element.appendTo("#tabelas");

}

function gerarTabelaBackboneSecundario(seqPrincipal) {

    let tabela;

    tabela = new Tabela(
        "Backbone óptico.", 
        "tabela-backbone-optico", 
        "Quantificação de materiais ópticos para a infraestrutura planejada.", 
        loadSecundario(seqPrincipal)
    )

    tabela.$element.appendTo("#tabelas");

}

export default gerarTabela;