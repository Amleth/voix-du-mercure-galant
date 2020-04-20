/** @jsx jsx */

import { jsx } from '@emotion/core'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { makeExtent } from '../common/helpers'

const IN = 0.2
const OUT = 0.5

export default ({ data }) => {
  return (
    <Layout>
      <ul css={{ listStyleType: 'none' }}>
        {data.allRecordingsYaml.edges.map(({ node }) => {
          const jpg = 'pictures/' + node.sherlock_uuid + '.jpg'
          const extent = makeExtent(node.recording.dcterms_extent)
          const date = node.recording.dcterms_date.toString()
          return (
            <li
              key={node.sherlock_uuid}
              css={{
                display: 'flex',
                marginBottom: '2rem',
                '*': { color: 'black', textDecoration: 'none' },
              }}
            >
              <Link
                to={'/' + node.sherlock_uuid}
                css={{
                  cursor: 'default',
                  display: 'flex',
                  transition: 'border 0.5s',
                  '&:hover + .main': {
                    opacity: 1,
                    transition: `opacity ${IN}s`,
                  },
                  '&:hover > img': {
                    opacity: 1,
                    transition: `opacity ${IN}s`,
                  },
                  '&:hover h3': {
                    color: '#1693A5',
                    transition: `color ${IN}s`,
                  },
                  width: '100%',
                }}
              >
                <img
                  src={jpg}
                  alt={node.recording.dcterms_title}
                  css={{
                    boxShadow: '3px 3px 6px 0px rgba(0,0,0,0.5)',
                    maxHeight: 135,
                    maxWidth: 135,
                    minHeight: 135,
                    minWidth: 135,
                    opacity: 0.69,
                    transition: `opacity ${OUT}s`,
                  }}
                />
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 30,
                    paddingLeft: '1.5rem',
                  }}
                >
                  <h3
                    css={{
                      color: 'black',
                      flexGrow: 1,
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      transition: `color ${OUT}s`,
                    }}
                  >
                    {node.recording.dcterms_title.replace('-', '–')}
                  </h3>
                  <div css={{ color: 'gray', textTransform: 'capitalize' }}>
                    {node.recording.vmg_performance_type} ({extent})
                  </div>
                  <div css={{ '*': { color: 'gray' } }}>
                    {node.recording.dcterms_creator && <span>Par </span>}
                    {node.recording.dcterms_creator && (
                      <span css={{ fontStyle: 'italic' }}>
                        {node.recording.dcterms_creator}
                      </span>
                    )}
                  </div>
                  <div css={{ color: 'darkgray' }}>
                    Publié le{' '}
                    {new Date(
                      date.slice(0, 4),
                      date.slice(4, 6) - 1,
                      date.slice(6, 8)
                    ).toLocaleDateString()}
                    {}
                  </div>
                </div>
              </Link>
              <div
                className="main"
                css={{
                  display: 'flex',
                  opacity: 0,
                  fontSize: '3rem',
                  textAlign: 'center',
                  width: 56,
                }}
              >
                <div
                  css={{
                    color: 'lightgray',
                    fontSize: 135,
                    marginTop: '-41px',
                    maxHeight: 135,
                  }}
                >
                  }
                </div>
                {/* <svg
                  css={{ height: 135, width: 100 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    fill="gray"
                    fontFamily="IMFELLFlowers2"
                    fontSize="55"
                    height="135px"
                    textAnchor="middle"
                    x="32"
                    y="88"
                  >
                    2
                  </text>
                </svg> */}
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecordingsYaml(
      sort: { fields: [recording___dcterms_date], order: DESC }
    ) {
      totalCount
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
`
