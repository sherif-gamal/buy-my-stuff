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

export default function ItemCard({title, image, excerpt}) {

    return (
        <Card style={{maxWidth: 300, height: 460, margin: '0 20px 20px 0'}}>
            <CardActionArea>
                <CardMedia
                component="img"
                alt={title}
                height="200"
                image={image}
                title={title}
                />
                <CardContent style={{padding: '0 16px', height: 170}}>
                <Typography gutterBottom variant="h5" component="h3">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {excerpt}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'flex-end'}}>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <MailIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
