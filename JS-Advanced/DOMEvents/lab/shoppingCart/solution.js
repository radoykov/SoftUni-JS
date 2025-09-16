function solve() {
    const shopCart = document.querySelector('.shopping-cart')
    shopCart.addEventListener('click', onClick);
    let textarea = document.querySelector('textarea');

    const cart = [];

    function onClick(ev) {
        if (ev.target.tagName == 'BUTTON' && ev.target.className == 'add-product') {
            const product = ev.target.parentNode.parentNode;
            const title = product.querySelector('.product-title').textContent;
            const price = Number(product.querySelector('.product-line-price').textContent);
            cart.push({ title, price});

            textarea.value += `Added ${title} for ${price.toFixed(2)} to the cart.\n`;
        }
    }

    document.querySelector('.checkout').addEventListener('click', () => {
        const result = cart.reduce((acc, c) => {
            acc.items.push(c.title);
            acc.total += c.price;
            return acc;
        }, { items: [], total: 0 });

        textarea.value += `You bought ${result.items.join(', ')} for ${result.total.toFixed(2)}."`;
    });
}