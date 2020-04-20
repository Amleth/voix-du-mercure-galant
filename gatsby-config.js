/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Voix du Mercure Galant`,
  },
  pathPrefix: `/voix-du-mercure-galant`,
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/recordings/`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          urls: ['fonts/imfell/fonts.css'],
        },
      },
    },
    `gatsby-plugin-emotion`,
  ],
}
