class TabelaBase {
    titulo;
    id;

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
    }

    constructor(titulo, id) {
        this.titulo = titulo;
        this.id = id;
    }

    
}