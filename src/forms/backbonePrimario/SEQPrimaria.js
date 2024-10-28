import { 
    InputInt,
    SEQSecundariaForms
} from "../../exports/formsExports.js";

import {
    SEQPrimariaModel as SEQPrimaria,
} from "../../exports/modelsExports.js"

class SEQPrimariaForm {
    
    numeroSEQs;
    /*
    numeroServidores;
    numeroRoteadores;
    */

    constructor() {

        this.id = "primaria";
        this.seqs = [];

        this.seqs.push(new SEQSecundariaForms(0));
        $(`#${this.id} .seqs-secundarias`).append($(this.seqs[0]));

        this.numeroSEQsInput = new InputInt(
            "Número de SEQs secundárias:",
            "numero-seqs-input",
            1,
            24,
            1,
            false,
            undefined 
        );

        /*
        this.numeroServidoresInput = new InputInt(
            "Número de Servidores:",
            "numero-seqs-input",
            1,
            24,
            1,
            false,
            undefined          
        );

        this.numeroRoteadoresInput = new InputInt(
            "Número de Roteadores:",
            "numero-seqs-input",
            1,
            24,
            1,
            false,
            undefined          
        ); 
        */
    
        this.numeroSEQsInput.onUpdate(numeroSEQs => {

            let $seqs = $(`#${this.id} .seq`);

            while (this.seqs.length > numeroSEQs) {
                this.seqs.pop();
                $seqs.last().remove();
            }

            while (this.seqs.length < numeroSEQs) {
                let novoSEQ = new SEQSecundariaForms(this.seqs.length);

                this.seqs.push(novoSEQ);
                $(`#${this.id} .seqs-secundarias`).append($(novoSEQ.html));
            }

            $(`#${this.id} #seq-principal-input`).attr("max", numeroSEQs);

            if (parseInt($(`#${this.id} #seq-principal-input`).val()) > numeroSEQs)
                $(`#${this.id} #seq-principal-input`).val(numeroSEQs);

            $('body')[0].offsetHeight;
            console.log(this.seqs);

        });

        $('body')[0].offsetHeight;

    }

    get html() {
        return `
            <article id="primaria" class="seq">
                <h2>Sala de Equipamentos Primaria</h2>
                <div class="seq-form">
                    ${this.numeroSEQsInput.html}
                    ${/*this.numeroServersInput.html}
                    ${this.numeroRoteadoresInput.html*/""}
                </div>
                <div class="seqs-secundarias">
                    ${this.seqs.map(seq => seq.html).join('\n')}
                </div>
            </article>
        `
    }

    get $element() {

        let $section = $(`<section id="${this.id}" class="seq"></section>`);
        

        let $h2 = $(`<h2>Sala de equipamentos principal}</h2>`);
    

        let $seqFormDiv = $(`<div class="seq-form"></div>`);
        $seqFormDiv.append(this.numeroSEQsInput.$element);
    

        let $seqSEQsDiv = $(`<div class="seqs-secundarias"></div>`);
        this.seqs.forEach(seq => $seqSEQsDiv.append(seq.$element));
    

        $section.append($h2);
        $section.append($seqFormDiv);
        $section.append($seqSEQsDiv);
    
        return $section;
        
    }

    get isValid() {

        let valid = this.numeroSEQsInput.isValid;

        return valid;
    }

    carregarSEQPrimaria() {

        if (!this.isValid) return undefined;
        
        const _seqs = this.seqs.map(_seq => {
            return _seq.carregarSEQSecundaria()
        });

        return new SEQPrimaria(
            _seqs
        )

    }



}

export default SEQPrimariaForm;