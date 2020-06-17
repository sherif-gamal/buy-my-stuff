import React from 'react'
import Layout from '../components/layout'
import { useStaticQuery, graphql, Link } from 'gatsby';
import ItemCard from '../components/itemCard';
import classes from '../styles/items.module.scss';

export default function Index() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
            slug
            date
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
      <div className={classes.itemsContainer}>
      {data.allMarkdownRemark.nodes.map(n => {
        const { title, excerpt, slug, featuredImage: {publicURL} } = n.frontmatter
        return (
          <Link to={slug} style={{textDecoration: 'none'}}>
            <ItemCard title={title} excerpt={excerpt} image={publicURL} />
          </Link>
        )
      })}
      </div>
    </Layout>
  )
}
