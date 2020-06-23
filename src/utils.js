import dedent from 'dedent';

const storage = typeof localStorage !== 'undefined' ? localStorage : {
    getItem: () => {},
    setItem: () => {}
}

export function readCart() {
    const cart = storage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    storage.setItem('cart', JSON.stringify({}));
    return {};
}

export function saveCart(cart) {
    storage.setItem('cart', JSON.stringify(cart));
}

export function computeMessage(cart) {
    return dedent`Hi Sherif,

        I like to buy your:

        ${Object.keys(cart).map(s => `${cart[s].title} listed for $${cart[s].price}`).join('\n')}
        
        When and where can I come to pick it up?`
}
