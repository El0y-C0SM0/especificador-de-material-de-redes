import { TabelaForms as Tabela } from "../../exports/formsExports.js";

import { 
    SEQPrimariaModel as SEQPrimaria,
    SEQSecundariaModel as SEQSecundaria
} from "../../exports/modelsExports.js";

function loadLinhasDebug(seq) {

    if (seq instanceof SEQPrimaria) {
        return loadSEQPrimaria(seq);
    } else {
        return loadSEQSecundaria(seq);
    }
  
}

function loadSEQPrimaria(seq) {

    let linhas = [];

    let tamanhoMalhaTotal = 0;

    seq.seqs.forEach(_seq => {

        tamanhoMalhaTotal += _seq.distancia;
        console.log("distancia: " + _seq.distancia);

    });

    linhas.push(
        new Tabela.LinhaTabela(
            "Tamanho total da Malha Óptica:",
            tamanhoMalhaTotal,
            "m"
        )
    );
    
    console.log(linhas);

    return linhas;

}

function loadSEQSecundaria(seq) {

    let linhas = [];

    linhas.push(
        new Tabela.LinhaTabela(
            "Tipo Fibra",
            seq.tipoFibra,
            "x"
        )
    );    

    linhas.push(
        new Tabela.LinhaTabela(
            "Distancia",
            seq.distancia,
            "x"
        )
    ); 

    linhas.push(
        new Tabela.LinhaTabela(
            "Numero de Fibras",
            seq.nFibras,
            "x"
        )
    );

    return linhas;

}

export default loadLinhasDebug;