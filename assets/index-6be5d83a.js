var q=Object.defineProperty;var B=(t,e,i)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var d=(t,e,i)=>(B(t,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();var E;(function(t){t.AZUL_CAT6="azul CAT6",t.VERMELHO_CAT6="vermelho CAT6",t.AMARELO_CAT6="amarelo CAT6",t.BRANCO_CAT6="branco CAT6",t.CINZA_CAT7="cinza CAT7"})(E||(E={}));var D;(function(t){t.CAT6="Conector femêa CAT6"})(D||(D={}));var T;(function(t){t.PATCH_PANEL_24="Patch panel 24 portas",t.PATCH_PANEL="Patch panel",t.SWITCH_24="Switch 24 portas",t.DIO_24="DIO 24 portas",t.DIO_24_4="DIO 24 portas 4 cabos",t.TERMINADOR_OPTICO="Terminador óptico",t.SVR_24="SVR 24 portas",t.EXAUSTOR="Exaustor",t.NO_BREAK="No break"})(T||(T={}));var O;(function(t){t.BANDEJA_FIXA="Bandeja fixa",t.BANDEJA_DESLIZANTE="Bandeja deslizante",t.ORGANIZADOR_FRONTAL="Organizador frontal",t.BANDEJA_DE_EMENDA_12="Bandeja de emenda 12 fibras"})(O||(O={}));var A;(function(t){t.METRO="metro",t.CAIXA="caixa",t.UNIDADE="unidade"})(A||(A={}));var M;(function(t){t.ETIQUETAS_IDENTIFICACAO="Etiquetas de identificação",t.ABRACADEIRAS="Abraçadeiras",t.PORCAS_GAIOLAS="Porcas gaiolas"})(M||(M={}));class c{static getTipoFibra(e){return e<=300?c.FOMMIG_50_125:c.FOSM_9_125}}c.FOMMIG_50_125="FOMMIG 50 x 125µm";c.FOSM_9_125="FOSM 9 x 125µm";class x{constructor(e){this._seqs=e}get seqs(){return this._seqs}get nFibras(){let e=0;return this.seqs.forEach(i=>{e+=i.nFibras}),e}}class V{constructor(e,i,s,a,n,l){this._id=e,this._tipoFibra=i,this._distancia=s,this._nFibras=(1+a+n+l)*2}get id(){return this._id}get tipoFibra(){return this._tipoFibra}get distancia(){return this._distancia}get nFibras(){return this._nFibras}}class N{constructor(e,i,s,a){this._peDireito=e,this._quantPavimentos=i,this._andarSEQ=s,this._sets=a}get peDireito(){return this._peDireito}get quantPavimentos(){return this._quantPavimentos}get andarSEQ(){return this._andarSEQ}get sets(){return this._sets}get nFibras(){let e=0;return this.sets.forEach(i=>{e+=i.nFibras}),e}}class y{constructor(e,i,s,a,n){this._nPavimento=e,this._tipoFibra=i,this._nFibras=(1+s+a+n)*2}get nPavimento(){return this._nPavimento}get tipoFibra(){return this._tipoFibra}get nFibras(){return this._nFibras}}class o{constructor(e,i,s,a){d(this,"titulo");d(this,"descricao");d(this,"id");d(this,"linhas");this.titulo=e,this.id=i,this.descricao=s,this.linhas=a}get html(){return`
      <article id="${this.id}">
        <h2>${this.titulo}</h2>
        <p>${this.descricao}</p>
        <table>
          <thead>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Unidade</th>
          </thead>
          <tbody>
            ${this.linhas.map(e=>{if(e.quantidade>0)return e.html}).join(`
`)}
          </tbody>
        </table>
      </article>
        `}get $element(){return $(this.html)}}d(o,"LinhaTabela",class{constructor(e,i,s){d(this,"nome");d(this,"quantidade");d(this,"unidade");this.nome=e,this.quantidade=i,this.unidade=s}get html(){return`
                <tr class="linha-tabela">
                    <td>${this.nome}</td>
                    <td>${this.quantidade}</td>
                    <td>${this.unidade}</td>
                </tr>
            `}});class j{constructor(){d(this,"numeroSEQs");this.id="primaria",this.seqs=[],this.seqs.push(new C(0)),$(`#${this.id} .seqs-secundarias`).append($(this.seqs[0])),this.numeroSEQsInput=new v("Número de SEQs secundárias:","numero-seqs-input",1,24,1,!1,void 0),this.numeroSEQsInput.onUpdate(e=>{let i=$(`#${this.id} .seq`);for(;this.seqs.length>e;)this.seqs.pop(),i.last().remove();for(;this.seqs.length<e;){let s=new C(this.seqs.length);this.seqs.push(s),$(`#${this.id} .seqs-secundarias`).append($(s.html))}$(`#${this.id} #seq-principal-input`).attr("max",e),parseInt($(`#${this.id} #seq-principal-input`).val())>e&&$(`#${this.id} #seq-principal-input`).val(e),$("body")[0].offsetHeight,console.log(this.seqs)}),$("body")[0].offsetHeight}get html(){return`
            <article id="primaria" class="seq">
                <h2>Sala de Equipamentos Primaria</h2>
                <div class="seq-form">
                    ${this.numeroSEQsInput.html}
                    
                </div>
                <div class="seqs-secundarias">
                    ${this.seqs.map(e=>e.html).join(`
`)}
                </div>
            </article>
        `}get $element(){let e=$(`<section id="${this.id}" class="seq"></section>`),i=$("<h2>Sala de equipamentos principal}</h2>"),s=$('<div class="seq-form"></div>');s.append(this.numeroSEQsInput.$element);let a=$('<div class="seqs-secundarias"></div>');return this.seqs.forEach(n=>a.append(n.$element)),e.append(i),e.append(s),e.append(a),e}get isValid(){return this.numeroSEQsInput.isValid}carregarSEQPrimaria(){if(!this.isValid)return;const e=this.seqs.map(i=>i.carregarSEQSecundaria());return new x(e)}}class R{constructor(e,i,s=-4144959,a=4144959,n=0,l=!0,r=1){d(this,"label");d(this,"id");d(this,"min");d(this,"max");d(this,"valueDefault");d(this,"nullable");d(this,"step");d(this,"$element");this.label=e,this.id=i,this.min=s,this.max=a,this.valueDefault=n,this.nullable=l,this.step=r,this.$element=$(this.html)}get html(){return`
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          <input id="${this.id}" type="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.valueDefault}">
        </label>
      </div>
    `}get isValid(){const e=this.value;return(e===""||e===null)&&this.nullable?!0:!(e<this.min||e>this.max)}onUpdate(e){this.$element.on("change",()=>{this.isValid&&e(this.value)})}get value(){}}class v extends R{get value(){return parseInt($("#"+this.id).val())}}class m{constructor(e,i,s=!1){d(this,"label");d(this,"id");d(this,"valueDefault");d(this,"$element");this.label=e,this.id=i,this.valueDefault=s,this.$element=$(this.html)}get html(){return`
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          <input id='${this.id}' type='checkbox' ${this.valueDefault?"checked":"unchecked"}>
        </label>
      </div>
    `}get value(){return document.getElementById(this.id).checked}}class _{constructor(e,i,s,a=void 0){d(this,"label");d(this,"itens");d(this,"keyDefault");d(this,"id");d(this,"$element");this.label=e,this.itens=i,this.id=s,this.keyDefault=a,this.$element=$(this.html)}get html(){let e=`<select id="${this.id}">`;for(const[i,s]of Object.entries(this.itens)){let a=this.keyDefault===i?"selected":"";e+=`<option value="${i}" ${a}>${s}</option>`}return e+="</select>",`
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          ${e}
        </label>
      </div>
    `}get value(){const e=$("#"+this.id);return this.itens[e.val()]}}class G{constructor(e){this.numeroSEQ=e,this.id=`seq-${e}`,this.tipoFibraRecebidaSelectField=new _("Tipo de fibra recebida:",{[c.FOMMIG_50_125]:"Fibra óptica Multimodo 50 x 125µm",[c.FOSM_9_125]:"Fibra óptica Monomodo 9 x 125µm"},"tipo-fibra-recebidas-select-field",c.FOSM_9_125),this.distanciaDaSEQPrincipalInput=new v("Distância da SEQ principal (em metros):","distancia-da-seq-principal-input",0,4e4,150,!1,50),this.atendeCftvInput=new m("Atende CFTV:",`atende-cftv-${e}`,!1),this.atendeDadosInput=new m("Atende Dados:",`atende-dados-${e}`,!0),this.atendeVoipInput=new m("Atende VoiP:",`atende-voip-${e}`,!1)}get html(){return`
            <article id="${this.id}" class="seq">
                <h2>SEQ Secundária ${this.numeroSEQ+1}</h2>
                <div class="seq-form">
                    ${this.tipoFibraRecebidaSelectField.html}
                    ${this.distanciaDaSEQPrincipalInput.html}
                </div>
                <div id="disciplinas-${this.numPavimento}" class="disciplinas">
                    ${this.atendeCftvInput.html}
                    ${this.atendeDadosInput.html}
                    ${this.atendeVoipInput.html}
                </div>
            </article>
        `}get $element(){let e=$(`<section id="${this.id}" class="seq"></section>`),i=$(`<h2>SEQ Secundária ${this.numeroSEQ+1}</h2>`);e.append(i);let s=$('<div class="seq-form"></div>');s.append(this.tipoFibraRecebidaSelectField.$element),s.append(this.distanciaDaSEQPrincipalInput.$element);let a=$(`
            <div id="disciplinas-${this.numeroSEQ+1}" class="disciplinas">
            </div>
        `);return a.append(this.atendeCftvInput.$element),a.append(this.atendeDadosInput.$element),a.append(this.atendeVoipInput.$element),e.append(s),e.append(a),e}get isValid(){let e=!0;return e&=this.distanciaDaSEQPrincipalInput.value>=0,e&=this.distanciaDaSEQPrincipalInput.value<=4e4,e}carregarSEQSecundaria(){if(!this.isValid)return;const e=this.tipoFibraRecebidaSelectField.value,i=this.distanciaDaSEQPrincipalInput.value,s=this.atendeCftvInput.value,a=this.atendeDadosInput.value,n=this.atendeVoipInput.value;return new V(this.numeroSEQ,e,i,s,a,n)}}const C=G;class H{constructor(){this.id="primaria",this.sets=[],this.sets.push(new P(0)),$(`#${this.id} .sets`).append($(this.sets[0].html)),this.quantPavimentosInput=new v("Número de andares:","quant-set-input",1,24,1,!1,void 0),this.andarSEQInput=new v("Andar da SEQ (número do set):","andar-seq-input",1,2,1,!1,void 0),this.alturaPeDireitoInput=new v("Altura do pé direito do edifício:","altura-pe-direito-input",1,10,3,!1,void 0),this.quantPavimentosInput.onUpdate(e=>{let i=$(`#${this.id} .set`);for(;this.sets.length>e;)this.sets.pop(),i.last().remove();for(;this.sets.length<e;){let s=new P(this.sets.length);this.sets.push(s),$(`#${this.id} .sets`).append($(s.html))}$(`#${this.id} #set-principal-input`).attr("max",e),parseInt($(`#${this.id} #set-principal-input`).val())>e&&$(`#${this.id} #set-principal-input`).val(e),$("body")[0].offsetHeight}),$("body")[0].offsetHeight}get html(){return`
            <article id="primaria" class="seq">
                <h2>Sala de Equipamentos Primaria</h2>
                <div class="seq-form">
                    ${this.quantPavimentosInput.html}
                    ${this.andarSEQInput.html}
                    ${this.alturaPeDireitoInput.html}
                </div>
                <div class="sets">
                    ${this.sets.map(e=>e.html).join(`
`)}
                </div>
            </article>
        `}get $element(){let e=$(`<section id="${this.id}" class="seq"></section>`),i=$("<h2>Sala de equipamentos principal}</h2>"),s=$('<div class="seq-form"></div>');s.append(this.quantPavimentosInput.$element),s.append(this.andarSEQInput.$element),s.append(this.alturaPeDireitoInput.$element);let a=$('<div class="sets"></div>');return this.sets.forEach(n=>a.append(n.$element)),e.append(i),e.append(s),e.append(a),e}get isValid(){return!0}carregarSEQ(){if(!this.isValid)return;const e=this.alturaPeDireitoInput.value,i=this.quantPavimentosInput.value,s=this.andarSEQInput.value,a=this.sets.map(n=>n.carregarSET());return new N(e,i,s,a)}}class k{constructor(e){this.numPavimento=e,this.id=`set-${e}`,this.tipoFibraRecebidaSelectField=new _("Tipo de fibra recebida:",{[c.FOMMIG_50_125]:"Fibra óptica Multimodo 50 x 125µm",[c.FOSM_9_125]:"Fibra óptica Monomodo 9 x 125µm"},"tipo-fibra-recebidas-select-field",c.FOSM_9_125),this.atendeCftvInput=new m("Atende CFTV:",`atende-cftv-${e}`,!1),this.atendeDadosInput=new m("Atende Dados:",`atende-dados-${e}`,!0),this.atendeVoipInput=new m("Atende VoiP:",`atende-voip-${e}`,!1),$("body")[0].offsetHeight}get html(){return`
            <div id=${this.id} class="set">
                <h2>SET do ${this.numPavimento+1}º Andar.</h2>
                ${this.tipoFibraRecebidaSelectField.html}
                <div id="disciplinas-${this.numPavimento}" class="disciplinas">
                    ${this.atendeCftvInput.html}
                    ${this.atendeDadosInput.html}
                    ${this.atendeVoipInput.html}
                </div>
            </div>
        `}get $element(){let e=$(`<section id="${this.id}" class="set"></section>`),i=$(`<h2>SET do ${this.numPavimento+1}º Andar.</h2>`),s=$('<div class="set-form"></div>');s.append(this.tipoFibraRecebidaSelectField.$element);let a=$(`
            <div id="disciplinas-${this.numPavimento+1}" class="disciplinas">
            </div>
        `);return a.append(this.atendeCftvInput.$element),a.append(this.atendeDadosInput.$element),a.append(this.atendeVoipInput.$element),e.append(i),e.append(s),e.append(a),e}get isValid(){return!0}carregarSET(){if(!this.isValid)return;const e=this.numPavimento,i=this.tipoFibraRecebidaSelectField.value,s=this.atendeCftvInput.value,a=this.atendeDadosInput.value,n=this.atendeVoipInput.value;return new y(e,i,s,a,n)}}const P=k;function z(t){let e,i,s,a,n;e=[];let l,r,p,u,h,f,b;return[l,r,p,u,h,f,b]=U(t),e.push(new o.LinhaTabela("Chassi DIO (Distribuido Interno Óptico) com 24 portas",l,"unid.")),e.push(new o.LinhaTabela("Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)",r,"unid.")),e.push(new o.LinhaTabela("Terminador óptico para 8 fibras",p,"unid.")),e.push(new o.LinhaTabela("Tubetes de proteção de emenda de fibras ópticas",u,"unid.")),i=F("Acoplador óptico",h),s=F("Pig tail",f),a=F("Cordão óptico",b),n=X(t),e=[...e,...i,...s,...a,...n],console.log(e),e}function F(t,e){let i=[];return i.push(new o.LinhaTabela(`${t} 9 x 125µm - SM - LC - simples`,e[0],"unid.")),i.push(new o.LinhaTabela(`${t} 50 x 125µm - SM - LC - simples`,e[1],"unid.")),i.push(new o.LinhaTabela(`${t} 9 x 125µm - SM - LC - duplo`,e[2],"unid.")),i.push(new o.LinhaTabela(`${t} 50 x 125µm - SM - LC - duplo`,e[3],"unid.")),i}function U(t){let e,i,s,a,n,l,r;return[e,s]=Z(t),i=J(t),a=t.nFibras*2,n=S(t),l=S(t),r=S(t),[e,i,s,a,n,l,r]}function Z(t){var e=0,i=0;return t.nFibras<=8?i++:e+=Math.ceil(t.nFibras/24),t.seqs.forEach(s=>{s.nFibras<=8?i++:e+=Math.ceil(s.nFibras/24)}),[e,i]}function J(t){var e=0;return e+=t.nFibras>8?Math.ceil(t.nFibras/12):0,t.seqs.forEach(i=>{e+=i.nFibras>8?Math.ceil(i.nFibras/12):0}),e}function S(t){let e,i,s,a,n,l,r;[e,i,s,a]=[0,0,0,0];let u=t.nFibras<=8?2:1;return t.seqs.forEach(h=>{n=h.tipoFibra,r=h.nFibras,l=r<8,l?n===c.FOMMIG_50_125?a+=u*r/2:s+=u*r/2:n===c.FOMMIG_50_125?i+=u*r:e+=u*r}),[e,i,s,a]}function X(t){let e,i,s;return e=[],i=[],s=[],t.seqs.forEach(a=>{e.push(K(a))}),e.forEach(a=>{let n=[a[0],a[1]],l=s.findIndex(r=>r[0]===n[0]&&r[1]===n[1]);l==-1?(i.push(new o.LinhaTabela(`Cabo de ${a[0]} Loose - com ${a[1]} fibras`,a[2],"m")),s.push([a[0],a[1]])):i[l].quantidade+=a[2]}),i}function K(t){return[t.tipoFibra,t.nFibras,t.distancia]}function W(t){let e,i,s,a,n;e=[];let l,r,p,u,h,f,b;return[l,r,p,u,h,f,b]=Y(t),e.push(new o.LinhaTabela("Chassi DIO (Distribuido Interno Óptico) com 24 portas",l,"unid.")),e.push(new o.LinhaTabela("Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)",r,"unid.")),e.push(new o.LinhaTabela("Terminador óptico para 8 fibras",p,"unid.")),e.push(new o.LinhaTabela("Tubetes de proteção de emenda de fibras ópticas",u,"unid.")),i=I("Acoplador óptico",h),s=I("Pig tail",f),a=I("Cordão óptico",b),n=ie(t),e=[...e,...i,...s,...a,...n],console.log(e),e}function I(t,e){let i=[];return i.push(new o.LinhaTabela(`${t} 9 x 125µm - SM - LC - simples`,e[0],"unid.")),i.push(new o.LinhaTabela(`${t} 50 x 125µm - SM - LC - simples`,e[1],"unid.")),i.push(new o.LinhaTabela(`${t} 9 x 125µm - SM - LC - duplo`,e[2],"unid.")),i.push(new o.LinhaTabela(`${t} 50 x 125µm - SM - LC - duplo`,e[3],"unid.")),i}function Y(t){let e,i,s,a,n,l,r;return[e,s]=ee(t),i=te(t),a=t.nFibras*2,n=g(t),l=g(t),r=g(t),[e,i,s,a,n,l,r]}function ee(t){var e=0,i=0;return t.nFibras<=8?i++:e+=Math.ceil(t.nFibras/24),t.sets.forEach(s=>{s.nFibras<=8?i++:e+=Math.ceil(s.nFibras/24)}),console.log(t.nFibras),[e,i]}function te(t){var e=0;return e+=t.nFibras>8?Math.ceil(t.nFibras/12):0,t.sets.forEach(i=>{e+=i.nFibras>8?Math.ceil(i.nFibras/12):0}),e}function g(t){let e,i,s,a,n,l,r;[e,i,s,a]=[0,0,0,0];let u=t.nFibras<=8?2:1;return t.sets.forEach(h=>{n=h.tipoFibra,r=h.nFibras,l=r<8,l?n===c.FOMMIG_50_125?a+=u*r/2:s+=u*r/2:n===c.FOMMIG_50_125?i+=u*r:e+=u*r}),[e,i,s,a]}function ie(t){let e,i,s;return e=[],i=[],s=[],t.sets.forEach(a=>{e.push(ae(a,t.peDireito,t.andarSEQ))}),e.forEach(a=>{let n=[a[0],a[1]],l=s.findIndex(r=>r[0]===n[0]&&r[1]==n[1]);l==-1?(i.push(new o.LinhaTabela(`Cabo de ${a[0]} Loose - com ${a[1]} fibras`,a[2],"m")),s.push([a[0],a[1]])):i[l].quantidade+=a[2]}),i}function ae(t,e,i){return[t.tipoFibra,t.nFibras,Math.abs(t.nPavimento-i)*e]}function se(t,e){$("#tabelas").empty(),e?ne(t.carregarSEQPrimaria()):re(t.carregarSEQ())}function ne(t){let e;e=new o("Backbone óptico.","tabela-backbone-optico","Quantificação de materiais ópticos para a infraestrutura planejada.",z(t)),e.$element.appendTo("#tabelas")}function re(t){let e;e=new o("Backbone óptico.","tabela-backbone-optico","Quantificação de materiais ópticos para a infraestrutura planejada.",W(t)),e.$element.appendTo("#tabelas")}function le(t){return $("#formulario").empty(),$("#formulario").removeClass("hidden"),$(t).val()==="primario"?de():oe()}function de(){let t=new j;return t.$element.appendTo("#formulario"),w(t,!0)}function oe(){let t=new H;return t.$element.appendTo("#formulario"),w(t,!1)}function w(t,e){return $("body")[0].offsetHeight,[t,e]}var ue=document.getElementById("gerar-tabela-btn"),L,Q;$('input[name="backbone"]').change(function(){[L,Q]=le(this)});ue.addEventListener("click",function(){se(L,Q)});
