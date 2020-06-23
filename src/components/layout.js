/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby";
import Header from "./header";
import '../styles/theme.scss';
import "./layout.css";
import Shop from "./shop";
import CartContext, { useDefaultContext } from '../components/cartContext';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  
  const defaultContext = useDefaultContext();
  
  return (
      <CartContext.Provider value={defaultContext}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            position: 'relative',
            margin: `0 auto`,
            maxWidth: 1024,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main style={{minHeight: '100vh'}}>
            {children}
            <Shop />
          </main>
          <footer style={{textAlign: 'center'}}>
            © 2020 <a href="https://sgamal.com">Sherif Gamal</a>
          </footer>
        </div>
      </CartContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
