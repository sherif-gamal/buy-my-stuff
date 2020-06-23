import React, { useState } from 'react';
import { readCart, saveCart } from '../utils';

export default React.createContext();

export function useDefaultContext() {
    const [cart, setCart] = useState(readCart());

    const addToCart = (item) => {
    const updated = {...cart, [item.slug]: item};
    setCart(updated);
    saveCart(updated);
    }

    const removeFromCart = (slug) => {
    const {[slug]: removed, ...updated} = cart;
    setCart(updated);
    saveCart(updated);
    }

    return {
        cart,
        addToCart,
        removeFromCart
    }
}