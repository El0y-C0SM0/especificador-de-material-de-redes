class Tabela {
  
  titulo;
  descricao;
  id;
  linhas;

  static LinhaTabela = class {
    nome;
    quantidade;
    unidade;

    constructor(nome, quantidade, unidade) {
      this.nome = nome;
      this.quantidade = quantidade;
      this.unidade = unidade;
    }

    get html() {
      return `
                <tr class="linha-tabela">
                    <td>${this.nome}</td>
                    <td>${this.quantidade}</td>
                    <td>${this.unidade}</td>
                </tr>
            `;
    }
  };

  constructor(titulo, id, descricao, linhas) {
    this.titulo = titulo;
    this.id = id;
    this.descricao = descricao;
    this.linhas = linhas;
  }

  get html() {
    return `
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
            ${this.linhas.map((linha) => {
                if (linha.quantidade > 0) return linha.html;
              }).join("\n")}
          </tbody>
        </table>
      </article>
        `;
  }

  get $element() {
    return $(this.html);
  }
}

export default Tabela;