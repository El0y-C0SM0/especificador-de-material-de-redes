import { PavimentoForm } from "./src/forms/components.js";
import { SelectField } from "./src/forms/inputs.js";

let pavimentoTeste = new PavimentoForm(0);

$(document).ready(function() {
  $('#meuInput').on('input', function() {
    const valorDigitado = $(this).val();
    console.log(valorDigitado);
  });
  let teste = $(pavimentoTeste.html);
  console.log(teste);
  
  teste.addClass('pavimento')
  teste.appendTo('#root');

});

// Crie uma instância da classe SelectField
// Crie uma instância da classe SelectField
const selectField = new SelectField(
  "Selecione uma opção",
  {
    "opcao1": "Opção 1",
    "opcao2": "Opção 2",
    "opcao3": "Opção 3"
  },
  "meu-select",
  "opcao2"
);

// Crie um elemento div para renderizar o select
const div = $("<div>").appendTo("body");

// Renderize o select dentro do elemento div
div.html(selectField.html);

// Agora, você pode testar o getter value
console.log(selectField.value);