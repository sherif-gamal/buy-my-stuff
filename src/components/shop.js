import React from 'react'
import { Fab, Badge } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import materialClasses from '../styles/material.module.scss';
import CartContext from './cartContext';
import { Link } from 'gatsby';

export default function Shop() {
    return (
        <CartContext.Consumer>
            {
                ({cart}) => (
                    <Link to="/contact" className={materialClasses.floatingButton} >
                        <Fab color="primary" aria-label="cart">
                        <Badge badgeContent={Object.keys(cart).length} color="secondary">
                            <ShoppingCart />
                        </Badge>
                        </Fab>
                    </Link>
                )
            }
            
        </CartContext.Consumer>
    )
}
