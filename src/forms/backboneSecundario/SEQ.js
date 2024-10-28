import { SEQModel as SEQ } from '../../exports/modelsExports.js';
import { 
    SETForms, 
    InputInt 
}  from '../../exports/formsExports.js';

class SEQForm {

    //peDireito, quantPavimentos, andarSEQ, sets

    constructor() {

        this.id = "primaria";

        this.sets = [];
        this.sets.push(new SETForms(0));
        
        $(`#${this.id} .sets`).append($(this.sets[0].html));

        this.quantPavimentosInput = new InputInt(
            "Número de andares:",
            "quant-set-input",
            1,
            24,
            1,
            false,
            undefined 
        );

        this.andarSEQInput = new InputInt(
            "Andar da SEQ (número do set):",
            "andar-seq-input",
            1,
            2,
            1,
            false,
            undefined 
        );

        this.alturaPeDireitoInput = new InputInt(
            "Altura do pé direito do edifício:",
            "altura-pe-direito-input",
            1,
            10,
            3,
            false,
            undefined

        )

        this.quantPavimentosInput.onUpdate(quantPavimentos => {

            let $sets = $(`#${this.id} .set`);

            while (this.sets.length > quantPavimentos) {
                this.sets.pop();
                $sets.last().remove();
            }

            while (this.sets.length < quantPavimentos) {
                let novoSET = new SETForms(this.sets.length);
                this.sets.push(novoSET);
                $(`#${this.id} .sets`).append($(novoSET.html));
            }

            $(`#${this.id} #set-principal-input`).attr("max", quantPavimentos);

            if (parseInt($(`#${this.id} #set-principal-input`).val()) > quantPavimentos)
                $(`#${this.id} #set-principal-input`).val(quantPavimentos);

            $('body')[0].offsetHeight;

        });

        $('body')[0].offsetHeight;

    }

    get html() {
        return `
            <article id="primaria" class="seq">
                <h2>Sala de Equipamentos Primaria</h2>
                <div class="seq-form">
                    ${this.quantPavimentosInput.html}
                    ${this.andarSEQInput.html}
                    ${this.alturaPeDireitoInput.html}
                </div>
                <div class="sets">
                    ${this.sets.map(set => set.html).join('\n')}
                </div>
            </article>
        `
    }

    get $element() {

        let $section = $(`<section id="${this.id}" class="seq"></section>`);
        
        let $h2 = $(`<h2>Sala de equipamentos principal}</h2>`);
        
        let $seqFormDiv = $(`<div class="seq-form"></div>`);
        $seqFormDiv.append(this.quantPavimentosInput.$element);
        $seqFormDiv.append(this.andarSEQInput.$element);
        $seqFormDiv.append(this.alturaPeDireitoInput.$element);
        
        let $seqSETsDiv = $(`<div class="sets"></div>`);
        this.sets.forEach(set => $seqSETsDiv.append(set.$element));

        $section.append($h2);
        $section.append($seqFormDiv);
        $section.append($seqSETsDiv);
    
        return $section;
        
    }

    get isValid() {
        return true;
    }

    carregarSEQ() {

        if (!this.isValid) return undefined;

        const peDireito = this.alturaPeDireitoInput.value;
        const quantPavimentos = this.quantPavimentosInput.value;
        const andarSEQ = this.andarSEQInput.value;
        
        const _sets = this.sets.map(_set => {
            return _set.carregarSET()
        });
        return new SEQ(
            peDireito,
            quantPavimentos,
            andarSEQ,
            _sets
        )

    }

}

export default SEQForm;