import React, { useState } from 'react'
import Layout from '../components/layout';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import classes from '../styles/items.module.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartContext from '../components/cartContext';
import { RemoveShoppingCart } from '@material-ui/icons';

export const query = graphql`
  query ($slug:String) {
    markdownRemark (
      fields: {
        slug: {
          eq: $slug
        }
      }
    ) {
      id
      frontmatter {
        title
        price
        slug
        excerpt
        images {
          childImageSharp {
            fixed(width: 700) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        date(formatString:"MMM DD YYYY")
      }
      html
    }
  }
`;

export default function Item({ data }) {
  const { frontmatter, html } = data.markdownRemark;
  const { slug, price, title } = frontmatter;
  const [value, setvalue] = useState(0);
  const images = frontmatter.images.map(image => image.childImageSharp.fixed.src);
  const slides = frontmatter.images.map(image => 
    <div onClick={() => setopen(true)} className={classes.image}>
        <Img style={{width: '300px'}} fluid={image.childImageSharp.fluid} key="" />
    </div>);
  const thumbnails = frontmatter.images.map(image => <Img style={{width: '50px'}} fluid={image.childImageSharp.fluid} key="" />);
  const [open, setopen] = useState(false);

  function prevSlide() {
    setvalue(value <= 0 ? slides.length - 1 : value - 1);
  }

  function nextSlide() {
    setvalue((value + 1) % slides.length);
  }

  return (
      <Layout>
          <SEO title={frontmatter.title}/>
          <div className={classes.itemContainer}>
            <div style={{width: "400px"}}>
              <Carousel 
                centered infinite 
                value={value} 
                slides={slides} 
                onChange={v => setvalue(v)}
                arrowLeft={<ArrowBackIosIcon className={classes.arrow} onClick={prevSlide}/>}
                arrowRight={<ArrowForwardIosIcon className={classes.arrow} onClick={nextSlide}/>}
              />
              <Dots number={thumbnails.length} thumbnails={thumbnails} value={value} onChange={v => setvalue(v)} number={slides.length} />
            </div>
            <div>
              <div dangerouslySetInnerHTML={{__html: html}}></div>
              <CartContext.Consumer>
                    {({cart, addToCart, removeFromCart}) => {
                      if (cart[slug]) {
                        return (
                          <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<RemoveShoppingCart  />}
                          onClick={() => removeFromCart(slug)}
                        >
                          Remove
                        </Button>
                        )
                    } else {
                        return (
                          <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<AddShoppingCartIcon />}
                          onClick={() => addToCart({slug, title, price})}
                        >
                          Add
                        </Button>
                        )
                    }
                    }}
              </CartContext.Consumer>
            </div>
            
          </div>
          {open && (
          <Lightbox
            mainSrc={images[value]}
            nextSrc={images[(value + 1) % images.length]}
            prevSrc={images[(value + images.length - 1) % images.length]}
            onCloseRequest={() => setopen(false)}
            onMovePrevRequest={prevSlide}
            onMoveNextRequest={nextSlide}
          />
        )}
      </Layout>
  )
}
