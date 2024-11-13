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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./static/recordings/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./static/pictures/`,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`
  ],
}
