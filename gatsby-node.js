const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allRecordingsYaml {
        edges {
          node {
            sherlock_uuid
            recording {
              dcterms_creator
              dcterms_date
              dcterms_extent
              dcterms_title
              vmg_performance_type
            }
            mg {
              dcterms_date
              dcterms_identifier
              dcterms_title
              vmg_indexation
            }
          }
        }
      }
    }
  `)
  result.data.allRecordingsYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.sherlock_uuid,
      component: path.resolve(`./src/templates/recording.jsx`),
      context: {
        slug: node.sherlock_uuid,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /wavesurfer/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
