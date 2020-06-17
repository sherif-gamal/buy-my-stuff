import React from 'react'
import { Fab } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import materialClasses from '../styles/material.module.scss';

export default function Shop() {
    return (
        <div className={materialClasses.floatingButton} >
            <Fab color="primary" aria-label="cart">
                <ShoppingCart />
            </Fab>
        </div>
    )
}
