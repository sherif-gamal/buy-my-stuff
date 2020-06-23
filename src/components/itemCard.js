import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import { RemoveShoppingCart } from '@material-ui/icons';
import CartContext from './cartContext';
import { Link } from 'gatsby';
import classes from '../styles/items.module.scss';

export default function ItemCard({slug, title, image, excerpt, price, date}) {

    return (
        <Card style={{maxWidth: 300, height: 460, margin: '0 20px 20px 0'}}>
            <CardActionArea>
                <Link to={`/${slug}`} style={{textDecoration: 'none'}}>
                    <CardMedia
                    component="img"
                    alt={title}
                    height="200"
                    image={image}
                    title={title}
                    />
                    <CardContent style={{padding: '0 16px', height: 170}}>
                    <h5 className={classes.cardH5}>
                        {title}
                    </h5>
                    <small>available from {date}</small>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {excerpt}
                    </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'space-between'}}>
                <div>{price > 0 ? '$' + price : price === 0 ? 'Free' : '∞'}</div>
                <div>
                    <CartContext.Consumer>
                        {({cart, addToCart, removeFromCart}) => {
                            if (cart[slug]) {
                                return (
                                    <IconButton color="secondary" aria-label="Remove from shopping cart" onClick={() => removeFromCart(slug)}>
                                        <RemoveShoppingCart />
                                    </IconButton>
                                )
                            } else {
                                return (
                                    <IconButton color="primary" aria-label="Add to shopping cart" onClick={() => addToCart({slug, title, price})}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                )
                            }
                        }}
                    </CartContext.Consumer>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <Link to='/contact'>
                            <MailIcon />
                        </Link>
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    )
}
