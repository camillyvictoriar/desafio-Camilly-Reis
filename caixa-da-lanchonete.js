class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        const itensPrincipais = [];
        const itensExtras = [];

        for (const itemInfo of itens) {
            const [item, quantidadeStr] = itemInfo.split(',');
            const quantidade = parseInt(quantidadeStr, 10);

            if (this.cardapio[item] === undefined) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (item.endsWith('extra')) {
                const itemPrincipal = item.replace('extra', '');

                if (!itensPrincipais.includes(itemPrincipal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }

                itensExtras.push({ item, quantidade });
            } else {
                itensPrincipais.push(item);
            }
        }

        if (itensPrincipais.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;

        for (const item of itensPrincipais) {
            valorTotal += this.cardapio[item];
        }

        for (const itemExtra of itensExtras) {
            valorTotal += this.cardapio[itemExtra.item] * itemExtra.quantidade;
        }

        if (!metodoDePagamento) {
            return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95; // Aplicar desconto de 5%
        } else if (metodoDePagamento === "credito") {
            valorTotal *= 1.03; // Aplicar acréscimo de 3%
        }

        return "R$ " + valorTotal.toFixed(2).replace(".", ",");
    }
}

export { CaixaDaLanchonete };