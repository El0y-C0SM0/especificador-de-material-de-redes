import { TabelaForms as Tabela } from "../../exports/formsExports.js";

import { 
    SEQModel as SEQ
} from "../../exports/modelsExports.js";

function loadLinhasSecundarioDebug(sala) {

    if (sala instanceof SEQ) {
        return loadSEQ(sala);
    } else {
        return loadSET(sala);
    }
  
}

function loadSEQ(seq) {

    let linhas = [];

    let alturaBackBone = seq.peDireito * seq.quantPavimentos;

    linhas.push(
        new Tabela.LinhaTabela(
            "Altura do backbone óptico:",
            alturaBackBone,
            "m"
        )
    );

    let tamanhoMalhaTotal = 0;

    seq.sets.forEach(_set => {
        tamanhoMalhaTotal+= Math.abs((_set.nPavimento - seq.andarSEQ)*seq.peDireito)
    })

    linhas.push(
        new Tabela.LinhaTabela(
            "Tamanho total da Malha Óptica:",
            tamanhoMalhaTotal,
            "m"
        )
    );

    return linhas;

}

function loadSET(set) {

    let linhas = [];

    linhas.push(
        new Tabela.LinhaTabela(
            "Fibra passada",
            `${set.tipoFibra} - com ${set.nFibras} fibras`,
            "x"
        )
    );    
    
    linhas.push(
        new Tabela.LinhaTabela(
            "Andar",
            set.nPavimento+1,
            "x"
        )
    ); 

    linhas.push(
        new Tabela.LinhaTabela(
            "Velocidade",
            set.velocidade,
            "muito rápido"
        )
    );

    return linhas;

}

export default loadLinhasSecundarioDebug;