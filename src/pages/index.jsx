/** @jsx jsx */

import { jsx, keyframes } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { graphql, navigate } from 'gatsby'
import React, { useState } from 'react'
import {
  formatYYYYMMDD,
  makeExtent,
  sortByDateMg,
  sortByDateVmg,
} from '../common/helpers'
import { TEAL, IN, OUT } from '../common/style'
import Layout from '../components/Layout'
import BottomPlayer from '../components/BottomPlayer'

const MARGIN = 12
const PICTURE_SIZE = 150
const SEPDOT = <div css={{ color: 'gray', padding: '4px 0' }}>•</div>

const pulseImg = keyframes`
  from {
    filter: brightness(100%);
  }
  50% {
    filter: brightness(77%);
  }
  to {
    filter: brightness(100%);
  }
`

const pulseIcon = keyframes`
  from {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 0.2;
  }
`

export default ({ data }) => {
  const [performanceTypeFilter, setPerformanceTypeFilter] = useState('')
  const [sortCriteria, setSortCriteria] = useState('VMG')
  const [playList, setPlayList] = useState(
    data.allRecordingsYaml.edges.sort(sortByDateVmg)
  )
  const [playListIndex, setPlayListIndex] = useState(0)

  const _setSortCriteria = (criteria) => {
    setSortCriteria(criteria)
    let sortFunction
    switch (criteria) {
      case 'VMG':
        sortFunction = sortByDateVmg
        break
      case 'MG':
        sortFunction = sortByDateMg
        break
      default:
        sortFunction = sortByDateVmg
    }
    setPlayList(playList.slice(0).sort(sortFunction))
  }

  const _setPerformanceTypeFilter = (filter) => {
    setPlayListIndex(0)
    setTimeout(() => {
      setPlayList(
        filter
          ? data.allRecordingsYaml.edges.filter(
              ({ node }) => node.recording.vmg_performance_type === filter
            )
          : data.allRecordingsYaml.edges
      )
      setPerformanceTypeFilter(filter)
    }, 0)
  }

  return (
    <Layout>
      <div
        css={{
          alignContent: 'center',
          borderBottom: '1px solid lightgray',
          borderTop: '1px solid lightgray',
          display: 'flex',
          flexWrap: 'wrap',
          fontSize: '125%',
          justifyContent: 'center',
        }}
      >
        {SEPDOT}
        <div
          css={{
            color: '' === performanceTypeFilter ? 'DarkTurquoise' : TEAL,
            margin: '0 4px',
            padding: '4px 8px',
            transition: `color ${OUT}s`,
            '&:hover': {
              color: 'DarkTurquoise',
              transition: `color ${IN}s`,
            },
          }}
          onClick={() => _setPerformanceTypeFilter('')}
          role="button"
          tabIndex="0"
        >
          Tout (
          {data.allRecordingsYaml.group.reduce((a, cv) => a + cv.totalCount, 0)}
          )
        </div>
        {SEPDOT}
        {data.allRecordingsYaml.group.map((pt) => (
          <React.Fragment key={pt.vmg_performance_type}>
            <div
              css={{
                color:
                  pt.vmg_performance_type === performanceTypeFilter
                    ? 'DarkTurquoise'
                    : TEAL,
                margin: '0 4px',
                padding: '4px 8px',
                transition: `color ${OUT}s`,
                '&:hover': {
                  color: 'DarkTurquoise',
                  transition: `color ${IN}s`,
                },
              }}
              onClick={() =>
                _setPerformanceTypeFilter(
                  performanceTypeFilter !== pt.vmg_performance_type
                    ? pt.vmg_performance_type
                    : ''
                )
              }
              role="button"
              tabIndex="0"
            >
              {pt.vmg_performance_type} ({pt.totalCount})
            </div>
            {SEPDOT}
          </React.Fragment>
        ))}
      </div>
      <div
        css={{
          alignContent: 'center',
          borderBottom: '1px solid lightgray',
          display: 'flex',
          flexWrap: 'wrap',
          fontSize: '125%',
          justifyContent: 'center',
        }}
      >
        <div
          css={{
            color: 'VMG' === sortCriteria ? 'DarkTurquoise' : TEAL,
            margin: '0 4px',
            padding: '4px 8px',
            transition: `color ${OUT}s`,
            '&:hover': {
              color: 'DarkTurquoise',
              transition: `color ${IN}s`,
            },
          }}
          onClick={() => _setSortCriteria('VMG')}
          role="button"
          tabIndex="0"
        >
          Par date de soumission
        </div>
        {SEPDOT}
        <div
          css={{
            color: 'MG' === sortCriteria ? 'DarkTurquoise' : TEAL,
            margin: '0 4px',
            padding: '4px 8px',
            transition: `color ${OUT}s`,
            '&:hover': {
              color: 'DarkTurquoise',
              transition: `color ${IN}s`,
            },
          }}
          onClick={() => _setSortCriteria('MG')}
          role="button"
          tabIndex="0"
        >
          Par date dans le Mercure
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: MARGIN + 'px',
        }}
      >
        {playList.map(({ node }) => {
          const jpg = 'pictures/' + node.sherlock_uuid + '.jpg'
          const extent = makeExtent(node.recording.dcterms_extent)
          return (
            <div
              key={node.sherlock_uuid}
              css={{
                alignContent: 'center',
                backgroundColor: 'white',
                borderColor: 'white',
                border: '1px solid white',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                margin: `${MARGIN}px ${MARGIN}px`,
                maxWidth: '292px',
                minWidth: PICTURE_SIZE * 2,
                padding: MARGIN + 'px',
                textAlign: 'center',
                transition: `background-color 1s, border-color ${OUT}s, box-shadow ${OUT}s`,
                '&:hover': {
                  backgroundColor: '#F8F8F8',
                  border: '1px solid lightgray',
                  boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.2)',
                  transition: `background-color 2s, border-color ${IN}s, box-shadow ${IN}s`,
                },
                '& h3': {
                  transition: `color ${OUT}s`,
                },
                '&:hover h3': {
                  color: TEAL,
                  transition: `color ${IN}s`,
                },
                '*': { color: 'black' },
              }}
              id={node.sherlock_uuid}
              onClick={(e) => {
                if (e.nativeEvent.target.tagName === 'IMG')
                  setPlayListIndex(
                    playList.findIndex(
                      (_) => _.node.sherlock_uuid === node.sherlock_uuid
                    )
                  )
                else navigate('/' + node.sherlock_uuid)
              }}
            >
              <div css={{ color: 'gray', position: 'relative' }}>
                <img
                  src={jpg}
                  alt={node.recording.dcterms_title}
                  css={{
                    borderRadius: '50%',
                    boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.6)',
                    margin: 'auto',
                    maxHeight: PICTURE_SIZE,
                    maxWidth: PICTURE_SIZE,
                    minHeight: PICTURE_SIZE,
                    minWidth: PICTURE_SIZE,
                    '&:hover': {
                      animation: `${pulseImg} 1s ease infinite`,
                      boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.82)',
                    },
                    '&:hover + svg': {
                      display: 'block',
                    },
                  }}
                />
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  css={{
                    animation: `${pulseIcon} 1s ease infinite`,
                    display: 'none',
                    float: 'right',
                    fontSize: '1em',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                />
              </div>
              <h3
                css={{
                  fontSize: '1.3rem',
                  lineHeight: 1.2,
                  marginTop: MARGIN,
                  textAlign: 'center',
                  transition: `color ${OUT}s`,
                }}
              >
                {node.recording.dcterms_title
                  .replace('  ', ' ')
                  .replace('-', '–')
                  .replace('« ', '« ')
                  .replace(' »', ' »')
                  .replace(' ?', ' ?')}{' '}
              </h3>
              <div css={{ '*': { color: 'gray' } }}>
                {node.mg.dcterms_creator && (
                  <span css={{ fontStyle: 'italic' }}>
                    {node.mg.dcterms_creator}
                  </span>
                )}
              </div>
              <div css={{ flexGrow: 1 }} />
              <div css={{ color: 'gray', textTransform: 'capitalize' }}>
                {node.recording.vmg_performance_type}
                {node.recording.vmg_performance_details &&
                  ', ' + node.recording.vmg_performance_details}{' '}
                ({extent})
              </div>
              <div css={{ color: 'darkgray' }}>
                {formatYYYYMMDD(node.mg.dcterms_date)}
                &nbsp;•&nbsp;Publié le{' '}
                {formatYYYYMMDD(node.recording.dcterms_date)}
              </div>
            </div>
          )
        })}
      </div>
      <div
        css={{
          backgroundColor: 'black',
          bottom: 0,
          position: 'fixed',
          width: '100%',
        }}
      >
        <BottomPlayer playList={playList} playListIndex_={playListIndex} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecordingsYaml(
      sort: { fields: [recording___dcterms_date], order: DESC }
    ) {
      group(field: recording___vmg_performance_type) {
        vmg_performance_type: fieldValue
        totalCount
      }
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
            vmg_performance_details
          }
          mg {
            dcterms_creator
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
