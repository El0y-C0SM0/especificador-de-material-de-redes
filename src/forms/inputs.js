// import $ from './jquery.js';

class InputNumber {
  label;
  id;
  min;
  max;
  valueDefault;
  nullable;
  step;
  $element;

  constructor(
    label,
    id,
    min = -0x3f3f3f,
    max = 0x3f3f3f,
    valueDefault = 0,
    nullable = true,
    step = 1
  ) {
    this.label = label;
    this.id = id;
    this.min = min;
    this.max = max;
    this.valueDefault = valueDefault;
    this.nullable = nullable;
    this.step = step;

    this.$element = $(this.html);
  }

  get html() {
    return `
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          <input id="${this.id}" type="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.valueDefault}">
        </label>
      </div>
    `;
  }

  get isValid() {
    const inputValue = this.value;
    if ((inputValue === "" || inputValue === null) && this.nullable) {
      return true;
    } else if (inputValue < this.min || inputValue > this.max) {
      return false;
    } else {
      return true;
    }
  }

  onUpdate(callback) {
    this.$element.on('change', () => {
      if(this.isValid) callback(this.value);
    });
  }

  get value() {}
}

export class InputInt extends InputNumber {
  get value() {
    return parseInt($("#" + this.id).val());
  }
}

export class InputFloat extends InputNumber {
  get value() {
    return parseFloat($("#" + this.id).val());
  }
}

export class Checkbox {
  label;
  id;
  valueDefault;
  $element;

  constructor(label, id, valueDefault = false) {
    this.label = label;
    this.id = id;
    this.valueDefault = valueDefault;

    this.$element = $(this.html);
  }

  get html() {
    return `
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          <input id='${this.id}' type="checkbox">
        </label>
      </div>
    `;
  }

  get value() {
    return document.getElementById(this.id).checked;
  }
}

export class SelectField {
  label;
  itens;
  keyDefault;
  id;
  $element

  constructor(label, itens, id, keyDefault = undefined) {
    this.label = label;
    this.itens = itens;
    this.id = id;
    this.keyDefault = keyDefault;

    this.$element = $(this.html);
  }

  get html() {
    let html = `<select id="${this.id}">`;

    for (const [chave, valor] of Object.entries(this.itens)) {
      let selected = this.keyDefault === chave ? "selected" : "";
      html += `<option value="${chave}" ${selected}>${valor}</option>`;
    }

    html += `</select>`;

    return `
      <div id="${this.id}-input-group" class="input-group">
        <label id="${this.id}-label">
          ${this.label}
          ${html}
        </label>
      </div>
    `;
  }

  get value() {
    const $select = $('#' + this.id);
    return this.itens[$select.val()];
  }
}
