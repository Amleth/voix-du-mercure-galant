/** @jsx jsx */

import { jsx } from '@emotion/core'
import { graphql } from 'gatsby'
import React, { useRef, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import Layout from '../components/layout'
import { makeExtent } from '../common/helpers'

const IN = 0.2
const OUT = 0.5

export default ({ data }) => {
  const waveformRef = useRef()
  const buttonRef = useRef()

  const extent = makeExtent(data.recordingsYaml.recording.dcterms_extent)

  useEffect(() => {
    let wavesurfer
    if (waveformRef.current) {
      const mp3 = 'recordings/' + data.recordingsYaml.sherlock_uuid + '.mp3'
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        cursorColor: '#1693A5',
        // progressColor: '',
        // waveColor: '',
      })
      wavesurfer.load(mp3)
      wavesurfer.on('pause', () => (buttonRef.current.innerHTML = 'Lecture'))
      wavesurfer.on('play', () => (buttonRef.current.innerHTML = 'Pause'))
      wavesurfer.on('ready', () => wavesurfer.play())
    }
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', () => wavesurfer.playPause())
    }
    return () => {
      wavesurfer.destroy()
    }
  }, [])

  const date = data.recordingsYaml.recording.dcterms_date.toString()

  return (
    <Layout>
      {/* RECORDING METADATA */}
      <div css={{ textAlign: 'center' }}>
        <h3
          css={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            marginBottom: '1rem',
          }}
        >
          {data.recordingsYaml.recording.dcterms_title}
        </h3>
        <div css={{ color: 'gray', textTransform: 'capitalize' }}>
          {data.recordingsYaml.recording.vmg_performance_type} ({extent})
        </div>
        {data.recordingsYaml.recording.dcterms_creator && (
          <div css={{ color: 'gray', fontStyle: 'italic' }}>
            {data.recordingsYaml.recording.dcterms_creator}
          </div>
        )}
        <div css={{ color: 'darkgray' }}>
          Publié le{' '}
          {new Date(
            date.slice(0, 4),
            date.slice(4, 6) - 1,
            date.slice(6, 8)
          ).toLocaleDateString()}
          {}
        </div>
        {/* WAVESURFER */}
        <div
          css={{
            // borderBottom: '1px solid lightgray',
            // borderTop: '1px solid lightgray',
            marginBottom: '1rem',
            marginTop: '1rem',
          }}
          ref={waveformRef}
        ></div>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <button
            css={{
              color: 'gray',
              fontVariant: 'small-caps',
              transition: `color ${OUT}s`,
              width: 111,
              '&:hover': {
                color: '#1693A5',
                transition: `color ${IN}s`,
              },
            }}
            ref={buttonRef}
          >
            Lecture
          </button>
        </div>
        {/* MERCURE METADATA */}
        {/* <div
          className="imff2"
          css={{ fontSize: '2rem', marginBottom: '-11px', marginTop: '1rem' }}
        >
          X
        </div> */}
        {data.recordingsYaml.mg.dcterms_title && (
          <>
            <svg
              css={{ height: 32, width: 111 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                fontFamily="IMFELLFlowers2"
                fontSize="40"
                textAnchor="middle"
                x="55"
                y="29"
              >
                X
              </text>
            </svg>
            <div css={{ fontSize: '2rem' }}>
              {data.recordingsYaml.mg.dcterms_date}
            </div>
            {data.recordingsYaml.mg.dcterms_title !==
              data.recordingsYaml.recording.dcterms_title && (
              <div css={{ fontSize: '1rem', fontStyle: 'italic' }}>
                {data.recordingsYaml.mg.dcterms_title}
              </div>
            )}
            <div>
              <a
                href={
                  'https://obvil.sorbonne-universite.fr/corpus/mercure-galant/MG-' +
                  data.recordingsYaml.mg.dcterms_identifier.split('_')[0] +
                  '#MG-' +
                  data.recordingsYaml.mg.dcterms_identifier
                }
                target="_blank"
                rel="noopener noreferrer"
                css={{ '&:hover': { textDecoration: 'underline' } }}
              >
                Édition OBVIL ({data.recordingsYaml.mg.dcterms_identifier})
              </a>
            </div>
            {/* <div className="imff2" css={{ fontSize: '2rem' }}>
          x
        </div> */}
            <svg
              css={{ height: 32, marginTop: '0.69rem', width: 111 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                fontFamily="IMFELLFlowers2"
                fontSize="40"
                textAnchor="middle"
                x="55"
                y="40"
              >
                x
              </text>
            </svg>
          </>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    recordingsYaml(sherlock_uuid: { eq: $slug }) {
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
`
