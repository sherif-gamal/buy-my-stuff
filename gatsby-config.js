require("dotenv").config();
module.exports = {
  siteMetadata: {
    title: `Buy my stuff`,
    description: `Buy my stuff cause I am going overseas`,
    author: `Sherif Gamal`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-recaptcha`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-external-links",
          {
            resolve: "gatsby-remark-images",
            options: {
              linkImagesToOriginal: false
            }
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
