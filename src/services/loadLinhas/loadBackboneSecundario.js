import { X } from "lucide-react";
import { TabelaForms as Tabela } from "../../exports/formsExports.js";
import { TiposModels as tps } from "../../exports/modelsExports.js";    

function loadBackBoneSecundario(seq) {

    let linhas, linhasAcopladores, linhasPigTails, linhasCordoes, linhasCabos;
    linhas = [];
    
    let nDIO, nBandeja, nTO, nTuboProtecao, acopladores, pigTails, cordaoOpticos;

    [nDIO, nBandeja, nTO, nTuboProtecao, acopladores, pigTails, cordaoOpticos] = calcularMateriais(seq);
    
    linhas.push(new Tabela.LinhaTabela(
        "Chassi DIO (Distribuido Interno Óptico) com 24 portas",
        nDIO,
        "unid."
    ));
    
    linhas.push(new Tabela.LinhaTabela(
        "Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)",
        nBandeja,
        "unid."
    ));

    linhas.push(new Tabela.LinhaTabela(
        "Terminador óptico para 8 fibras",
        nTO,
        "unid."
    ));

    linhas.push(new Tabela.LinhaTabela(
        "Tubetes de proteção de emenda de fibras ópticas",
        nTuboProtecao,
        "unid."
    ));

    linhasAcopladores = linhasMmSmDuploSimples("Acoplador óptico", acopladores);
    linhasPigTails = linhasMmSmDuploSimples("Pig tail", pigTails);
    linhasCordoes = linhasMmSmDuploSimples("Cordão óptico", cordaoOpticos)
    linhasCabos = calcularCabos(seq);

    linhas = [...linhas, ...linhasAcopladores, ...linhasPigTails, ...linhasCordoes, ...linhasCabos];

    console.log(linhas);

    return linhas;

}

function linhasMmSmDuploSimples(material, array) {
    let  linhas = [];
    //let simplesSM, simplesMM, duploSM, duploMM;

    linhas.push(new Tabela.LinhaTabela(
        `${material} 9 x 125µm - SM - LC - simples`,
        array[0],
        "unid."
    ));

    linhas.push(new Tabela.LinhaTabela(
        `${material} 50 x 125µm - SM - LC - simples`,
        array[1],
        "unid."
    ));

    linhas.push(new Tabela.LinhaTabela(
        `${material} 9 x 125µm - SM - LC - duplo`,
        array[2],
        "unid."
    ));

    linhas.push(new Tabela.LinhaTabela(
        `${material} 50 x 125µm - SM - LC - duplo`,
        array[3],
        "unid."
    ));

    return linhas;

}

function calcularMateriais(seq) {
    //pigTails, cordaoOpticos
    let nDIO, nBandeja, nTO, nTuboProtecao, acopladores, pigTails, cordaoOpticos;

    [nDIO, nTO] = calcularDIO(seq);
    nBandeja = calcularBandeja(seq);
    nTuboProtecao = seq.nFibras * 2;
    acopladores = calcularAcopladoresPigtailCordao(seq);
    pigTails = calcularAcopladoresPigtailCordao(seq);
    cordaoOpticos = calcularAcopladoresPigtailCordao(seq);

    return [nDIO, nBandeja, nTO, nTuboProtecao, acopladores, pigTails, cordaoOpticos];

}

function calcularDIO(seq) {

    var nDIO = 0;
    var nTO = 0;

    if(seq.nFibras<=8) nTO++;
    else nDIO += Math.ceil(seq.nFibras/24);

    seq.sets.forEach(_set => {
        if(_set.nFibras<=8) nTO++;
        else nDIO += Math.ceil(_set.nFibras/24);
    });

    console.log(seq.nFibras);

    return [nDIO, nTO];

}

function calcularBandeja(seq) {

    var nBandeja = 0;

    nBandeja += (seq.nFibras>8) ? Math.ceil(seq.nFibras/12) : 0;

    seq.sets.forEach(_set => {
        nBandeja += ((_set.nFibras>8) ? Math.ceil(_set.nFibras/12) : 0);
    });

    return nBandeja;
}

function calcularAcopladoresPigtailCordao(seq) {

    let simplesSM, simplesMM, duploSM, duploMM, tipoFibra, TO, nFibras;
    [simplesSM, simplesMM, duploSM, duploMM] = [0, 0, 0, 0];

    let seqPrincipalTO = seq.nFibras<=8;
    let mult = seqPrincipalTO ? 2 : 1;

    seq.sets.forEach(_set => {

        tipoFibra = _set.tipoFibra;
        nFibras = _set.nFibras;
        TO = nFibras<8;

        if (TO)
            if (tipoFibra === tps.TipoFibraOptica.FOMMIG_50_125) duploMM += mult*nFibras/2;
            else  duploSM += mult*nFibras/2;
        else 
            if(tipoFibra === tps.TipoFibraOptica.FOMMIG_50_125) simplesMM += mult*nFibras;
            else  simplesSM += mult*nFibras;

    });
    
    return [simplesSM, simplesMM, duploSM, duploMM];

}

function calcularCabos(seq) {

    let cabos, linhasCabos, cabosChecked;

    cabos = [];
    linhasCabos = [];
    cabosChecked = [];

    seq.sets.forEach(_set => {
        cabos.push(calcularCabo(_set, seq.peDireito, seq.andarSEQ));
    })

    cabos.forEach(_cabo => {
        
        let idCabo = [_cabo[0],_cabo[1]];

        let _caboRepetido = cabosChecked.findIndex(_caboChecked => 
            (_caboChecked[0] === idCabo[0]) && (_caboChecked[1] == idCabo[1])
        );

        if (_caboRepetido==-1) {

            linhasCabos.push(new Tabela.LinhaTabela(
                `Cabo de ${_cabo[0]} Loose - com ${_cabo[1]} fibras`,
                _cabo[2],
                "m"
            ))
            cabosChecked.push([_cabo[0], _cabo[1]]);

        }
        else {

            linhasCabos[_caboRepetido].quantidade += _cabo[2];

        }

    })

    return linhasCabos;

}

function calcularCabo(set, peDireito, andarSEQ) {

    let cabo = [set.tipoFibra, set.nFibras, Math.abs(set.nPavimento-andarSEQ)*peDireito];
    return cabo;

}

/*
linhas.push(new Tabela.LinhaTabela(
        "Cabo de Fibra Óptica Loose (FOMMIG) 50 x 125µm - com 8 fibras"
        tamanhoCabo,
        "m"
    ));
*/

export default loadBackBoneSecundario;