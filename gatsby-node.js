/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.onCreateNode = ({ node, actions }) => {
    if (node.internal.type !== 'MarkdownRemark') return;
    const { createNodeField } = actions;
  
    const slug = node.frontmatter.slug || path.basename(node.fileAbsolutePath, '.md');
    console.log("slug", slug)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const itemTemplate = path.resolve('src/templates/item.js');
    const result = await graphql(`
          query {
              allMarkdownRemark {
              edges {
                  node {
                   fields {
                    slug
                   }
                  }
              }
              }
          }
      `);
  
    if (result.errors) {
      throw result.errors;
    }
  
    result.data.allMarkdownRemark.edges.forEach((edge) => {
      const { slug } = edge.node.fields;
      console.log(slug)
      createPage({
        path: slug,
        component: itemTemplate,
        context: {
          slug: slug,
        },
      });
    });
  };