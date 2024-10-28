import { X } from "lucide-react";
import { TabelaForms as Tabela } from "../../exports/formsExports.js";
import loadLinhasDebug from "./loadLinhasDebug.js";
import loadLinhasSecundarioDebug from "./loadLinhasSecundarioDebug.js";

function gerarTabelaDebug($seqPrincipal, backbonePrimario) {

    $("#tabelas").empty();
    if (backbonePrimario) gerarTabelaBackbonePrimario($seqPrincipal.carregarSEQPrimaria());
    else gerarTabelaBackboneSecundario($seqPrincipal.carregarSEQ());

}

function gerarTabelaBackbonePrimario(seqPrincipal) {

    let tabelaSEQPrincipal, tabelasSEQsSecundarias;


    tabelaSEQPrincipal = new Tabela(
        "SEQ Principal", 
        "tabela-seq-principal", 
        "Debug SEQ Principal", 
        loadLinhasDebug(seqPrincipal)
    )

    tabelasSEQsSecundarias = [];
    seqPrincipal.seqs.forEach(seq => {

        tabelasSEQsSecundarias.push(new Tabela(
            `SEQ ${seq.id}`, 
            `tabela-seq-secundaria-${seq.id}`, 
            `Debug SEQ  ${seq.id}`, 
            loadLinhasDebug(seq)
        ));

    })
    

    console.log(tabelaSEQPrincipal);
    console.log(tabelasSEQsSecundarias[0].$element);

    tabelaSEQPrincipal.$element.appendTo("#tabelas");
    tabelasSEQsSecundarias.forEach(tabela => tabela.$element.appendTo("#tabelas"));

}

function gerarTabelaBackboneSecundario(seqPrincipal) {

    let tabelaSEQPrincipal, tabelasSETs;


    tabelaSEQPrincipal = new Tabela(
        "SEQ Principal", 
        "tabela-seq-principal", 
        "Debug SEQ Principal", 
        loadLinhasSecundarioDebug(seqPrincipal)
    )

    tabelasSETs = [];
X
    seqPrincipal.sets.forEach(set => {

        tabelasSETs.push(new Tabela(
            `SET ${set.nPavimento}`, 
            `tabela-set-${set.nPavimento}`, 
            `Debug SEQ  ${set.nPavimento}`, 
            loadLinhasSecundarioDebug(set)
        ));

    })


    console.log(tabelaSEQPrincipal);
    console.log(tabelasSETs[0].$element);
    
    tabelaSEQPrincipal.$element.appendTo("#tabelas");
    tabelasSETs.forEach(tabela => tabela.$element.appendTo("#tabelas"));

}

export default gerarTabelaDebug;