var G=Object.defineProperty;var J=(n,e,t)=>e in n?G(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var u=(n,e,t)=>(J(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();class Q{constructor(e,t,i=-4144959,a=4144959,s=0,r=!0,d=1){u(this,"label");u(this,"id");u(this,"min");u(this,"max");u(this,"valueDefault");u(this,"nullable");u(this,"step");u(this,"$element");this.label=e,this.id=t,this.min=i,this.max=a,this.valueDefault=s,this.nullable=r,this.step=d,this.$element=$(this.html)}get html(){return`
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          <input id="${this.id}" type="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.valueDefault}">
        </label>
      </div>
    `}get isValid(){const e=this.value;return(e===""||e===null)&&this.nullable?!0:!(e<this.min||e>this.max)}onUpdate(e){this.$element.on("change",()=>{this.isValid&&e(this.value)})}get value(){}}class U extends Q{get value(){return parseInt($("#"+this.id).val())}}class V extends Q{get value(){return parseFloat($("#"+this.id).val())}}class X{constructor(e,t,i=!1){u(this,"label");u(this,"id");u(this,"valueDefault");u(this,"$element");this.label=e,this.id=t,this.valueDefault=i,this.$element=$(this.html)}get html(){return`
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          <input id='${this.id}' type="checkbox">
        </label>
      </div>
    `}get value(){return document.getElementById(this.id).checked}}class W{constructor(e,t,i,a=void 0){u(this,"label");u(this,"itens");u(this,"keyDefault");u(this,"id");u(this,"$element");this.label=e,this.itens=t,this.id=i,this.keyDefault=a,this.$element=$(this.html)}get html(){let e=`<select id="${this.id}">`;for(const[t,i]of Object.entries(this.itens)){let a=this.keyDefault===t?"selected":"";e+=`<option value="${t}" ${a}>${i}</option>`}return e+="</select>",`
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          ${e}
        </label>
      </div>
    `}get value(){const e=$("#"+this.id);return this.itens[e.val()]}}var w;(function(n){n.AZUL_CAT6="azul CAT6",n.VERMELHO_CAT6="vermelho CAT6",n.AMARELO_CAT6="amarelo CAT6",n.BRANCO_CAT6="branco CAT6",n.CINZA_CAT7="cinza CAT7"})(w||(w={}));var x;(function(n){n.CAT6="Conector femêa CAT6"})(x||(x={}));class I{static toTipoPatchCord(e){switch(e){case I.CFTV:return w.BRANCO_CAT6;case I.REDE:return w.AZUL_CAT6;case I.VOIP:default:return w.AMARELO_CAT6}}static toTipoPatchCable(e){switch(e){case I.CFTV:return w.VERMELHO_CAT6;case I.REDE:return w.AZUL_CAT6;case I.VOIP:default:return w.AMARELO_CAT6}}}I.REDE="Rede";I.CFTV="CFTV";I.VOIP="VoIP";class C{static getTipo(e,t){return e==M.FOMMIG_50_125?C.LC_DUPLO_MM_50_125:C.LC_SIMPLES_SM_9_125}}C.LC_DUPLO_MM_50_125="LC duplo MM 50x125µm";C.LC_SIMPLES_MM_50_125="LC simples MM 50x125µm";C.LC_DUPLO_SM_9_125="LC duplo SM 9x125µm";C.LC_SIMPLES_SM_9_125="LC simples SM 9x125µm";var b;(function(n){n.PATCH_PANEL_24="Patch panel 24 portas",n.PATCH_PANEL="Patch panel",n.SWITCH_24="Switch 24 portas",n.DIO_24="DIO 24 portas",n.DIO_24_4="DIO 24 portas 4 cabos",n.TERMINADOR_OPTICO="Terminador óptico",n.SVR_24="SVR 24 portas",n.EXAUSTOR="Exaustor",n.NO_BREAK="No break"})(b||(b={}));var S;(function(n){n.BANDEJA_FIXA="Bandeja fixa",n.BANDEJA_DESLIZANTE="Bandeja deslizante",n.ORGANIZADOR_FRONTAL="Organizador frontal",n.BANDEJA_DE_EMENDA_12="Bandeja de emenda 12 fibras"})(S||(S={}));var p;(function(n){n.METRO="metro",n.CAIXA="caixa",n.UNIDADE="unidade"})(p||(p={}));var L;(function(n){n.ETIQUETAS_IDENTIFICACAO="Etiquetas de identificação",n.ABRACADEIRAS="Abraçadeiras",n.PORCAS_GAIOLAS="Porcas gaiolas"})(L||(L={}));class M{static getTipoFibra(e){return e<=300?M.FOMMIG_50_125:M.FOSM_9_125}}M.FOMMIG_50_125="FOMMIG 50 x 125µm";M.FOSM_9_125="FOSM 9 x 125µm";class B extends Error{constructor(e){super(e),this.name="DistanciaInvalidaError"}}class K extends Error{constructor(e,t){super(e),this.altura=0,this.altura=t,this.name="DistanciaInvalidaError"}}class D{constructor(e,t,i){this.quantidade=e,this.unidade=t,this.tipo=i}}class j{constructor(e,t){this.quantidade=e,this.alturaUnitaria=t}}class g extends j{constructor(e,t,i){super(t,i),this.tipo=e}}class y extends j{constructor(e,t,i){super(t,i),this.tipo=e}}class F{constructor(e,t=!1){var i,a,s,r;this.equipamentos=new Map([...e]),this.aberto=t,this.componentes=new Map,this.micelaneas=new Map,t||e.set(b.EXAUSTOR,new g(b.EXAUSTOR,1,1)),this.componentes.set(S.BANDEJA_DESLIZANTE,new y(S.BANDEJA_DESLIZANTE,1,4)),this.componentes.set(S.BANDEJA_FIXA,new y(S.BANDEJA_FIXA,1,1));let d=(a=(i=this.equipamentos.get(b.DIO_24))===null||i===void 0?void 0:i.quantidade)!==null&&a!==void 0?a:0;this.componentes.set(S.BANDEJA_DE_EMENDA_12,new y(S.BANDEJA_DE_EMENDA_12,d,0));let l=0;this.equipamentos.get(b.SWITCH_24)!=null&&(l=(r=(s=this.equipamentos.get(b.SWITCH_24))===null||s===void 0?void 0:s.quantidade)!==null&&r!==void 0?r:0,this.equipamentos.set(b.PATCH_PANEL_24,new g(b.PATCH_PANEL_24,l,1)),this.componentes.set(S.ORGANIZADOR_FRONTAL,new y(S.ORGANIZADOR_FRONTAL,l,1)),this.jumperCables=new D(l-1,p.UNIDADE,w.CINZA_CAT7));let f=this.alturaTotal;if(f>48)throw new K(`Tamanho do rack alcançou ${f} e 
                execedeu o limite recomendavel de 44U, 
                que deixaria 4 para expandir`,f);this.defineMicelaneas(l),Object.freeze(this)}defineMicelaneas(e){this.micelaneas.set(L.ETIQUETAS_IDENTIFICACAO,new D(e*24*2+e*2+e-1,p.UNIDADE,L.ETIQUETAS_IDENTIFICACAO)),this.micelaneas.set(L.PORCAS_GAIOLAS,new D(this.alturaTotal*4,p.UNIDADE,L.PORCAS_GAIOLAS))}static arredondaAltura(e){return e<=12?e+e%2:Math.ceil(e/4)*4}get alturaTotal(){let e=[...this.equipamentos.values(),...this.componentes.values()].reduce((t,i)=>t+i.alturaUnitaria,0)*1.5;return F.arredondaAltura(e)}get altura(){return this.alturaTotal}}F.tamanhoMaximo=48;class Y{constructor(e){this.patchCords=new Map,this.micelaneas=new Map,this.pontosTelecom=e}get pontosTelecom(){return this._pontosTelecom}set pontosTelecom(e){this._pontosTelecom=e;let t=0,i=0;e.forEach(a=>{t+=a.quantidade,i+=a.quantidade;let s=I.toTipoPatchCord(a.tipo);this.patchCords.set(s,new D(a.quantidade,p.UNIDADE,s))}),this.tomadasFemeas=new D(i,p.UNIDADE,x.CAT6),this.micelaneas.set(L.ETIQUETAS_IDENTIFICACAO,new D(i+i/2,p.UNIDADE,L.ETIQUETAS_IDENTIFICACAO))}get numeroDiciplinas(){return this.pontosTelecom==null?0:this.pontosTelecom.size}get numeroConectores(){return this.tomadasFemeas==null?0:this.tomadasFemeas.quantidade}}class Z{constructor(e,t,i,a=!1){if(this.areaDeTrabalho=e,this.rackAberto=a,this.equipamentosAtivos=new Map,this.pigtails=new Map,this.cordoes=new Map,this.acopladores=new Map,this.micelaneas=new Map,t>90)throw new B("Distancia dos pontos de telecom até a sala de telecom não deve exeder 90 metros");this.comprimentoMalhaHorizontal=t,this.numeroPiso=i,this.defineAtivos()}save(){if(this.comprimentoMalhaHorizontal>90)throw new B("Distancia dos pontos de telecom até a sala de telecom não deve exeder 90 metros");this.defineAtivos()}defineAtivos(){this.equipamentosAtivos.set(b.SWITCH_24,new g(b.SWITCH_24,Math.ceil(this.areaDeTrabalho.numeroConectores/24),1));let e,t;this.fibrasOpticasRecebidas!=null&&(this.numeroFibras<=8?(this.equipamentosAtivos.set(b.TERMINADOR_OPTICO,new g(b.TERMINADOR_OPTICO,1,0)),e=C.getTipo(this.fibrasOpticasRecebidas.tipo,!0),t=this.numeroFibras/2):(this.equipamentosAtivos.set(b.DIO_24,new g(b.DIO_24,Math.ceil(this.numeroFibras/24),1)),e=C.getTipo(this.fibrasOpticasRecebidas.tipo,!1),t=this.numeroFibras),this.defineAcopladores(e,t))}defineAcopladores(e,t){this.pigtails.set(e,new D(t,p.UNIDADE,e)),this.cordoes.set(e,new D(t,p.UNIDADE,e)),this.acopladores.set(e,new D(t,p.UNIDADE,e))}get numeroFibras(){return this.areaDeTrabalho.numeroDiciplinas*4}get diciplinas(){let e=new Set;return this.areaDeTrabalho.pontosTelecom.forEach(t=>e.add(t.tipo)),e}get jumperCables(){var e;if(((e=this.equipamentosAtivos.get(b.SWITCH_24))===null||e===void 0?void 0:e.quantidade)==null)return;let i=this.racks.reduce((a,s)=>{var r,d;return a+((d=(r=s==null?void 0:s.jumperCables)===null||r===void 0?void 0:r.quantidade)!==null&&d!==void 0?d:0)},0);return new D(i,p.UNIDADE,w.CINZA_CAT7)}get equipamentos(){let e=new Map;return this.racks.forEach(t=>{t.equipamentos.forEach(i=>{let a=e.get(i.tipo);a!==void 0&&(a.quantidade+=i.quantidade,e.set(i.tipo,i))})}),e}get patchCables(){let e=new Map;return this.areaDeTrabalho.pontosTelecom.forEach(t=>{let i=I.toTipoPatchCable(t.tipo);e.set(i,new D(t.quantidade,p.UNIDADE,i))}),e}get racks(){let e=[];try{return[new F(this.equipamentosAtivos,this.rackAberto)]}catch(t){let i=1;for(;F.arredondaAltura(t.altura/i)<48;i++);const a=F.arredondaAltura(t.altura/i);let s=a,r=new Map;this.equipamentosAtivos.forEach(d=>{s-d.quantidade<0?(r.set(d.tipo,new g(d.tipo,s,d.alturaUnitaria)),e.push(new F(r)),r.clear(),r.set(d.tipo,new g(d.tipo,-(s-d.quantidade),d.alturaUnitaria)),s=a+s-d.quantidade):r.set(d.tipo,d)}),e.push(new F(r))}return e}}class ee extends Z{constructor(e,t,i,a,s,r=[],d=0,l=!1,f=12,_=M.FOSM_9_125){super(e,t,i,l=l),this.salasDeTelecom=s,this.salasDeEquipamento=r,this.distanciaSEQ=d,this.alturaAndares=a,this.defineFibrasOpticas(f,_),this.defineAtivos()}save(){super.save(),this.defineFibrasOpticas(),this.defineAtivos()}get tipoFibra(){var e,t,i,a;let s=0;if(this.salasDeEquipamento==null)return M.FOMMIG_50_125;if(((e=this===null||this===void 0?void 0:this.salasDeEquipamento)===null||e===void 0?void 0:e.length)==0){let r=(t=this===null||this===void 0?void 0:this.salasDeTelecom)===null||t===void 0?void 0:t.slice().sort((d,l)=>d.numeroPiso-l.numeroPiso);s=Math.max(...r.map(d=>Math.abs(this.numeroPiso-d.numeroPiso+1)*this.alturaAndares))}else if(((i=this===null||this===void 0?void 0:this.salasDeEquipamento)===null||i===void 0?void 0:i.length)!=0){let r=(a=this===null||this===void 0?void 0:this.salasDeEquipamento)===null||a===void 0?void 0:a.slice().sort((d,l)=>d.distanciaSEQ-l.distanciaSEQ);s=Math.max(...r.map(d=>d.distanciaSEQ))}return M.getTipoFibra(s)}get diciplinas(){var e,t;let i=super.diciplinas;return(e=this===null||this===void 0?void 0:this.salasDeTelecom)===null||e===void 0||e.forEach(a=>{a.diciplinas.forEach(s=>i.add(s))}),(t=this===null||this===void 0?void 0:this.salasDeEquipamento)===null||t===void 0||t.forEach(a=>{a.diciplinas.forEach(s=>i.add(s))}),i}get numeroFibras(){var e,t;let i=0;return(e=this===null||this===void 0?void 0:this.salasDeTelecom)===null||e===void 0||e.forEach(a=>i+=a.numeroFibras),(t=this===null||this===void 0?void 0:this.salasDeEquipamento)===null||t===void 0||t.forEach(a=>i+=a.numeroFibras),i+=super.numeroFibras,i==0?super.numeroFibras:i}get fibraBackbone(){let e=0;return this.salasDeTelecom.slice().sort((a,s)=>a.numeroPiso-s.numeroPiso).forEach(a=>{e+=(Math.abs(this.numeroPiso-a.numeroPiso)+2)*this.alturaAndares}),this.salasDeEquipamento.slice().sort((a,s)=>a.distanciaSEQ-s.distanciaSEQ).forEach(a=>e+=a.distanciaSEQ),new D(e,p.METRO,this.tipoFibra)}defineAtivos(){var e,t;if(super.defineAtivos(),this.equipamentosAtivos.get(b.TERMINADOR_OPTICO)!=null&&this.equipamentosAtivos.delete(b.TERMINADOR_OPTICO),this.diciplinas.has(I.CFTV)){let a=0;(e=this===null||this===void 0?void 0:this.salasDeTelecom)===null||e===void 0||e.forEach(s=>{s.diciplinas.has(I.CFTV)&&(a+=2)}),(t=this===null||this===void 0?void 0:this.salasDeEquipamento)===null||t===void 0||t.forEach(s=>{s.diciplinas.has(I.CFTV)&&(a+=1)}),this.equipamentosAtivos.set(b.SVR_24,new g(b.SVR_24,Math.ceil(a/24),2))}this.equipamentosAtivos.set(b.DIO_24_4,new g(b.DIO_24,Math.ceil(this.numeroFibras/24),1));let i=C.getTipo(this.tipoFibra,!1);this.defineAcopladores(i,this.numeroFibras),this.equipamentosAtivos.set(b.DIO_24_4,new g(b.DIO_24_4,Math.ceil(this.numeroFibras/24)+1,1)),this.fibrasOpticasRecebidas!=null&&(i=C.getTipo(this.fibrasOpticasRecebidas.tipo,!1),this.defineAcopladores(i,this.fibrasOpticasRecebidas.quantidade))}defineFibrasOpticas(e=12,t=M.FOSM_9_125){let i=this.fibraBackbone.tipo;this.salasDeTelecom.forEach(a=>{a.fibrasOpticasRecebidas=new D(a.numeroFibras,p.UNIDADE,i),a.save()}),this.salasDeEquipamento.forEach(a=>{a.fibrasOpticasRecebidas=new D(a.numeroFibras,p.UNIDADE,i),a.save()}),this.fibrasOpticasRecebidas=new D(e,p.UNIDADE,t)}}class z{constructor(e){u(this,"numPavimento");u(this,"rackAbertoChecbox");u(this,"malhaHorizontalInput");u(this,"pontoRedeInput");u(this,"pontoCftvInput");u(this,"pontoVoipInput");u(this,"id");this.numPavimento=e,this.rackAbertoChecbox=new X("Rack aberto:",`rack-aberto-${e}`,!1),this.malhaHorizontalInput=new V("Comprimento da malha horizontal:",`malha-horizontal-${e}`,1,90,10,!1,void 0),this.pontoRedeInput=new V("Pontos de rede:",`pontos-rede-${e}`,0,void 0,10,!1,void 0),this.pontoCftvInput=new V("Pontos de CFTV:",`pontos-cftv-${e}`,0,void 0,10,!1,void 0),this.pontoVoipInput=new V("Pontos de VoIP:",`pontos-voip-${e}`,0,void 0,10,!1,void 0),this.id=`pavimento-${e}`}get html(){return`
            <div id=${this.id} class="pavimento">
                <h3>Pavimento ${this.numPavimento+1}</h3>
                ${this.rackAbertoChecbox.html}
                ${this.malhaHorizontalInput.html}
                <div id="ponto-telecom-pavimento-${this.numPavimento}" class="pontos-telecom">
                    ${this.pontoRedeInput.html}
                    ${this.pontoCftvInput.html}
                    ${this.pontoVoipInput.html}
                </div>
            </div>
        `}get $element(){let e=$(`
            <div id=${this.id} class="pavimento">
                <h3>Pavimento ${this.numPavimento+1}</h3>
            </div>
        `);e.addClass("pavimento"),e.append(this.rackAbertoChecbox.$element),e.append(this.malhaHorizontalInput.$element);let t=$(`
            <div id="pontos-telecom-pavimento-${this.numPavimento}" class="pontos-telecom">
            </div>
        `);return t.append(this.pontoRedeInput.$element),t.append(this.pontoCftvInput.$element),t.append(this.pontoVoipInput.$element),e.append(t),e}get isValid(){let e=!0;return e=e&&this.malhaHorizontalInput.isValid,e=e&&this.pontoRedeInput.isValid,e=e&&this.pontoCftvInput.isValid,e=e&&this.pontoVoipInput.isValid,e}carregarSalaTelecom(){if(!this.isValid)return;const e=this.rackAbertoChecbox.value,t=this.malhaHorizontalInput.value,i=this.pontoRedeInput.value,a=this.pontoCftvInput.value,s=this.pontoVoipInput.value;try{let r=new Map;i>0&&r.set(I.REDE,new D(i,p.UNIDADE,I.REDE)),a>0&&r.set(I.CFTV,new D(a,p.UNIDADE,I.CFTV)),s>0&&r.set(I.VOIP,new D(s,p.UNIDADE,I.VOIP));let d=new Y(r);return new Z(d,t,this.numPavimento,e)}catch(r){console.error(r)}}}class H{constructor(e){u(this,"alturaAndarInput");u(this,"numeroPavimentosInput");u(this,"pavimentoPrincipalInput");u(this,"distanciaDaSEQPrincipalInput");u(this,"numeroFibrasRecebidasInput");u(this,"tipoFibraRecebidasSelectField");u(this,"numeroSEQ");u(this,"id");u(this,"pavimentos");this.numeroSEQ=e,this.id=`seq-${e}`,this.pavimentos=[new z(0)],this.alturaAndarInput=new V("Altura dos andares:","altura-andar-input",1,10,5,!1,1),this.numeroFibrasRecebidasInput=new U("Número de fibras recebidas:","numero-fibras-recebidas-input",4,24,4,!1,4),this.tipoFibraRecebidasSelectField=new W("Tipo de fibra recebida:",{[M.FOMMIG_50_125]:"Fibra óptica Multimodo 50 x 125µm",[M.FOSM_9_125]:"Fibra óptica Monomodo 9 x 125µm"},"tipo-fibra-recebidas-select-field",M.FOSM_9_125),this.numeroPavimentosInput=new U("Número de pavimentos:","numero-pavimentos-input",1,24,1,!1,void 0),this.distanciaDaSEQPrincipalInput=new U("Distância da SEQ principal (em metros):","distancia-da-seq-principal-input",0,4e4,150,!1,1),this.pavimentoPrincipalInput=new U("Pavimento principal:","pavimento-principal-input",1,1,1,!1,1),this.numeroPavimentosInput.onUpdate(t=>{let i=$(`#${this.id} .pavimento`);for(;this.pavimentos.length>t;)this.pavimentos.pop(),i.last().remove();for(;this.pavimentos.length<t;){let a=new z(this.pavimentos.length);this.pavimentos.push(a),$(`#${this.id} .seq-pavimentos`).append($(a.html))}$(`#${this.id} #pavimento-principal-input`).attr("max",t),parseInt($(`#${this.id} #pavimento-principal-input`).val())>t&&$(`#${this.id} #pavimento-principal-input`).val(t),$("body")[0].offsetHeight})}get html(){return`
            <article id="${this.id}" class="seq">
                <h2>Sala de equipamentos ${this.numeroSEQ>=0?this.numeroSEQ+1:""}</h2>
                <div class="seq-form">
                    ${this.tipoFibraRecebidasSelectField.html}
                    ${this.numeroFibrasRecebidasInput.html}
                    ${this.alturaAndarInput.html}
                    ${this.distanciaDaSEQPrincipalInput.html}
                    ${this.numeroPavimentosInput.html}
                    ${this.pavimentoPrincipalInput.html}
                </div>
                <div class="seq-pavimentos">
                    ${this.pavimentos.map(e=>e.html).join(`
`)}
                </div>
            </article>
        `}get $element(){let e=$(`<section id="${this.id}" class="seq"></section>`),t=$(`<h2>Sala de equipamentos ${this.numeroSEQ>=0?this.numeroSEQ+1:""}</h2>`);e.append(t);let i=$('<div class="seq-form"></div>');i.append(this.tipoFibraRecebidasSelectField.$element),i.append(this.numeroFibrasRecebidasInput.$element),i.append(this.alturaAndarInput.$element),i.append(this.distanciaDaSEQPrincipalInput.$element),i.append(this.numeroPavimentosInput.$element),i.append(this.pavimentoPrincipalInput.$element),e.append(i);let a=$('<div class="seq-pavimentos"></div>');return this.pavimentos.forEach(s=>a.append(s.$element)),e.append(a),e}get isValid(){let e=!0;return e=e&&this.numeroFibrasRecebidasInput.isValid,e=e&&this.alturaAndarInput.isValid,e=e&&this.numeroPavimentosInput.isValid,e=e&&this.pavimentoPrincipalInput.isValid&&this.pavimentoPrincipalInput.value<=this.numeroPavimentosInput.value,e=e&&this.pavimentos.every(t=>t.isValid),e}carregarSalaEquipamentos(e=[]){if(!this.isValid)return;let t=this.pavimentos.map(f=>f.carregarSalaTelecom());const i=this.alturaAndarInput.value,a=this.pavimentoPrincipalInput.value-1,s=this.numeroFibrasRecebidasInput.value,r=e.length==0?this.distanciaDaSEQPrincipalInput.value:0,d=this.tipoFibraRecebidasSelectField.value;let l=t.splice(a,1)[0];return new ee(l.areaDeTrabalho,l.comprimentoMalhaHorizontal,a,i,t,e,r,l.rackAberto,s,d)}}class m{constructor(e,t,i,a){u(this,"titulo");u(this,"descricao");u(this,"id");u(this,"linhas");this.titulo=e,this.id=t,this.descricao=i,this.linhas=a}get html(){return`
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
        `}get $element(){return $(this.html)}}u(m,"LinhaTabela",class{constructor(e,t,i){u(this,"nome");u(this,"quantidade");u(this,"unidade");this.nome=e,this.quantidade=t,this.unidade=i}get html(){return`
                <tr class="linha-tabela">
                    <td>${this.nome}</td>
                    <td>${this.quantidade}</td>
                    <td>${this.unidade}</td>
                </tr>
            `}});var O=[];let R;$('input[name="seq-secundaria"]').change(function(){if($("#formulario").empty(),O=[],$("#formulario").removeClass("hidden"),R=void 0,$(this).val()==="com-seq-secundaria"){let n=new U("Número de salas de equipamento:","numero-seqs-input",1,24,1,!1,1);R=new U("Número da sala de equipamentos principal:","seq-principal-input",1,1,1,!1,1),n.onUpdate(e=>{for(;O.length>e;){let t=O.pop();$("#"+t.id).remove()}for(;O.length<e;){let t=new H(O.length);O.push(t),t.$element.appendTo("#formulario")}$("#seq-principal-input").attr("max",e),parseInt($("#seq-principal-input").val())>e&&$("#seq-principal-input").val(e)}),n.$element.appendTo("#setup"),R.$element.appendTo("#setup"),O.push(new H(0))}else $("#numero-seqs-input-input-group").remove(),$("#seq-principal-input-input-group").remove(),O.push(new H(-1));O[0].$element.appendTo("#formulario"),$("body")[0].offsetHeight});function te(n){let e=[];n.forEach(l=>e=e.concat(l.salasDeTelecom));let t=e.map(l=>l.areaDeTrabalho);n.forEach(l=>t.push(l.areaDeTrabalho));let i=new m.LinhaTabela(x.CAT6,0,p.UNIDADE),a=new Map,s=new Map;t.forEach(l=>{i.quantidade+=l.tomadasFemeas.quantidade,l.patchCords.forEach(f=>{let _=a.get(f.tipo);_==null?a.set(f.tipo,f):(_.quantidade+=f.quantidade,a.set(f.tipo,_))}),l.micelaneas.forEach(f=>{let _=s.get(f.tipo);_==null?s.set(f.tipo,f):(_.quantidade+=f.quantidade,s.set(_.tipo,_))})});let r=Array.from(a.values()).map(l=>new m.LinhaTabela(`Patch cord ${l.tipo} 3 metros`,l.quantidade,l.unidade)),d=Array.from(s.values()).map(l=>new m.LinhaTabela(l.tipo,l.quantidade,l.unidade));return[i,...r,...d]}function ae(n){let e=[];n.forEach(h=>e=e.concat(h.salasDeTelecom));let t=0,i=new Map,a=new Map,s=new Map,r=new Map,d=new Map,l=new D(0,p.UNIDADE,w.CINZA_CAT7);e.forEach(h=>{t+=h.comprimentoMalhaHorizontal,h.pigtails.forEach(o=>{let c=i.get(o.tipo);c==null?i.set(o.tipo,o):(c.quantidade+=o.quantidade,i.set(c.tipo,c))}),h.cordoes.forEach(o=>{let c=a.get(o.tipo);c==null?a.set(o.tipo,o):(c.quantidade+=o.quantidade,a.set(c.tipo,c))}),h.acopladores.forEach(o=>{let c=s.get(o.tipo);c==null?s.set(o.tipo,o):(c.quantidade+=o.quantidade,s.set(c.tipo,c))}),h.micelaneas.forEach(o=>{let c=r.get(o.tipo);c==null?r.set(o.tipo,o):(c.quantidade+=o.quantidade,r.set(c.tipo,c))}),h.patchCables.forEach(o=>{let c=d.get(o.tipo);c!=null&&(o.quantidade+=c.quantidade),d.set(o.tipo,o)}),l.quantidade+=h.jumperCables.quantidade});const f=Array.from(i.values()).map(h=>new m.LinhaTabela(`Pigtail ${h.tipo}`,h.quantidade,h.unidade)),_=Array.from(a.values()).map(h=>new m.LinhaTabela(`Cordao ${h.tipo}`,h.quantidade,h.unidade)),E=Array.from(s.values()).map(h=>new m.LinhaTabela(`Acoplador ${h.tipo}`,h.quantidade,h.unidade)),N=new m.LinhaTabela(`MH ${w.BRANCO_CAT6}`,Math.ceil(t/305),p.CAIXA),q=Array.from(r.values()).map(h=>new m.LinhaTabela(h.tipo,h.quantidade,h.unidade)),P=Array.from(d.values()).map(h=>new m.LinhaTabela(`Patch Cable ${h.tipo} 3 metros`,h.quantidade,h.unidade)),T=new m.LinhaTabela(`Jumper cable ${l.tipo}`,l.quantidade,l.unidade);return[N,...P,T,...f,..._,...E,...q]}function ie(n){let e=0,t=new Map,i=new Map,a=new Map,s=new Map,r=new Map,d=new Map,l=new D(0,p.UNIDADE,w.CINZA_CAT7);n.forEach(o=>{e+=o.comprimentoMalhaHorizontal,o.pigtails.forEach(v=>{let A=t.get(v.tipo);A==null?t.set(v.tipo,v):(A.quantidade+=v.quantidade,t.set(A.tipo,A))}),o.cordoes.forEach(v=>{let A=i.get(v.tipo);A==null?i.set(v.tipo,v):(A.quantidade+=v.quantidade,i.set(A.tipo,A))}),o.acopladores.forEach(v=>{let A=a.get(v.tipo);A==null?a.set(v.tipo,v):(A.quantidade+=v.quantidade,a.set(A.tipo,A))}),o.micelaneas.forEach(v=>{let A=s.get(v.tipo);A==null?s.set(v.tipo,v):(A.quantidade+=v.quantidade,s.set(A.tipo,A))}),o.patchCables.forEach(v=>{let A=d.get(v.tipo);A!=null&&(v.quantidade+=A.quantidade),d.set(v.tipo,v)});let c=o.fibraBackbone,k=r.get(c.tipo);k!=null&&(c.quantidade+=k.quantidade),r.set(c.tipo,c),l.quantidade+=o.jumperCables.quantidade});const f=Array.from(t.values()).map(o=>new m.LinhaTabela(`Pigtail ${o.tipo}`,o.quantidade,o.unidade)),_=Array.from(i.values()).map(o=>new m.LinhaTabela(`Cordao ${o.tipo}`,o.quantidade,o.unidade)),E=Array.from(a.values()).map(o=>new m.LinhaTabela(`Acoplador ${o.tipo}`,o.quantidade,o.unidade)),N=Array.from(d.values()).map(o=>new m.LinhaTabela(`Patch Cable ${o.tipo} 3 metros`,o.quantidade,o.unidade)),q=new m.LinhaTabela(`MH ${w.BRANCO_CAT6}`,Math.ceil(e/305),p.CAIXA),P=Array.from(s.values()).map(o=>new m.LinhaTabela(o.tipo,o.quantidade,o.unidade)),T=new m.LinhaTabela(`Jumper cable ${l.tipo}`,l.quantidade,l.unidade);return[...Array.from(r.values()).map(o=>new m.LinhaTabela(`${o.tipo} backbone`,o.quantidade,o.unidade)),q,...N,T,...f,..._,...E,...P]}function se(n){let e=[];n.forEach(E=>e=e.concat(E.salasDeTelecom));let t=[...n,...e],i=new Map,a=new Map,s=new Map,r=new Map;t.forEach(E=>{E.racks.forEach(q=>{let P=i.get(`Rack ${q.altura}U ${q.aberto?"aberto":"fechado"}`);P==null?i.set(`Rack ${q.altura}U ${q.aberto?"aberto":"fechado"}`,1):i.set(`Rack ${q.altura}U ${q.aberto?"aberto":"fechado"}`,P+1),q.equipamentos.forEach(T=>{let h=a.get(T.tipo);h!=null&&(T.quantidade+=h.quantidade),a.set(T.tipo,T)}),q.componentes.forEach(T=>{let h=s.get(T.tipo);h!=null&&(T.quantidade+=h.quantidade),s.set(T.tipo,T)}),q.micelaneas.forEach(T=>{let h=r.get(T.tipo);h!=null&&(T.quantidade+=h.quantidade),r.set(T.tipo,T)})})});const d=Array.from(i).map(([E,N])=>new m.LinhaTabela(E,N,p.UNIDADE)),l=Array.from(a.values()).map(E=>new m.LinhaTabela(`${E.tipo} ${E.alturaUnitaria}U`,E.quantidade,p.UNIDADE)),f=Array.from(s.values()).map(E=>new m.LinhaTabela(`${E.tipo} ${E.alturaUnitaria}U`,E.quantidade,p.UNIDADE)),_=Array.from(r.values()).map(E=>new m.LinhaTabela(E.tipo,E.quantidade,E.unidade));return[...d,...l,...f,..._]}$("#gerar-tabela-btn").on("click",()=>{$("#tabelas").empty();let n=O.map(s=>s.carregarSalaEquipamentos(void 0));R!=null&&R.isValid&&(n[R.value-1]=O[R.value-1].carregarSalaEquipamentos(n)),new m("Área de trabalho","tabela-area-de-trabalho","Itens quantificados na área de trabalho.",te(n)).$element.appendTo("#tabelas"),new m("Salas de Telecomunicações","tabela-sala-telecom","Itens quantificados nas salas de telecomunicações",ae(n)).$element.appendTo("#tabelas"),new m("Salas de Equipamentos","tabela-sala-equipamentos","Itens quantificados nas salas de equipamentos",ie(n)).$element.appendTo("#tabelas"),new m("Racks","tabela-racks","Itens quantificados nos racks",se(n)).$element.appendTo("#tabelas")});
