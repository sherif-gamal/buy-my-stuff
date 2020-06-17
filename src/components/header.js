import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react";
import { ShoppingCart } from '@material-ui/icons';
import classes from '../styles/header.module.scss';

const Header = ({ siteTitle }) => (
  <header className={classes.headerContainer}>
    <div className={classes.header}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <h2 style={{ margin: 0 }}>
            {siteTitle}
          </h2>
        </Link>
        <Link to="/contact"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}>
            <h2 style={{ margin: 0 }}>
              Contact
            </h2>
        </Link>
    </div>
    
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
