import React from 'react'
import Layout from '../components/layout'
import { useStaticQuery, graphql, Link } from 'gatsby';
import ItemCard from '../components/itemCard';
import classes from '../styles/items.module.scss';

export default function Index() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {published: {ne: false}}}, sort: {fields: frontmatter___order}) {
        nodes {
          frontmatter {
            title
            slug
            sold
            date(formatString: "MMMM DD, YYYY")
            featuredImage {
              publicURL
            }
            excerpt
            price
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <p className={classes.note}>Hi! I am selling my stuff because I am going overseas. Prices are negotiable withing reasonable limits.
      Add what you like to the cart and send me a message, or you can find my phone number on <Link to='/contact'>Contact</Link></p>
      <div className={classes.itemsContainer}>
        {data.allMarkdownRemark.nodes.map(n => {
          const { title, excerpt, slug, featuredImage: { publicURL }, price, date, sold } = n.frontmatter
          return (
            <ItemCard key={slug} slug={slug} title={title} excerpt={excerpt} image={publicURL} price={price} date={date} sold={sold} />
          )
        })}
      </div>
    </Layout>
  )
}
