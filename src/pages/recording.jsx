/** @jsx jsx */

import { jsx } from '@emotion/react'
import { graphql, Link } from 'gatsby'
import React, { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import Layout from '../components/Layout'
import { makeExtent, formatYYYYMMDD } from '../common/helpers'
import { IN, OUT, TEAL } from '../common/style'

const PICTURE_SIZE = 150

const Recording = ({ data }) => {
  const waveformRef = useRef()
  const buttonRef = useRef()

  const extent = makeExtent(data.recordingsYaml.recording.dcterms_extent)

  useEffect(() => {
    let wavesurfer
    if (waveformRef.current) {
      const mp3 = data.audio.publicURL
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        cursorColor: 'DarkTurquoise',
        progressColor: TEAL,
        waveColor: 'DarkTurquoise',
      })
      wavesurfer.load(mp3)
      wavesurfer.on('pause', () => (buttonRef.current.innerHTML = 'Lecture'))
      wavesurfer.on('play', () => (buttonRef.current.innerHTML = 'Pause'))
      // wavesurfer.on('ready', () => wavesurfer.play())
    }
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', () => wavesurfer.playPause())
    }
    return () => {
      wavesurfer.destroy()
    }
  }, [data.recordingsYaml.sherlock_uuid, data.audio.publicURL])

  return (
    <Layout>
      {/* RECORDING METADATA */}
      <div
        css={{
          borderTop: '1px solid gray',
          margin: 'auto',
          maxWidth: 800,
          paddingTop: '2rem',
          textAlign: 'center',
        }}
      >
        <h2
          css={{
            fontSize: '2.5rem',
          }}
        >
          {data.recordingsYaml.recording.dcterms_title}
        </h2>
        <div
          css={{
            fontSize: '1.75rem',
          }}
        >
          {data.recordingsYaml.mg.dcterms_creator}
        </div>
        <Link
          to="/"
          css={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            transition: `color ${OUT}s`,
            '&:hover': {
              color: 'DarkTurquoise',
              transition: `color ${IN}s`,
            },
          }}
        >
          {' '}
          (Retour)
        </Link>
        <div
          css={{
            color: 'gray',
            fontSize: '1.5rem',
            marginTop: '2rem',
          }}
        >
          {data.recordingsYaml.recording.vmg_performance_type} ({extent})
        </div>
        {data.recordingsYaml.recording.dcterms_creator && (
          <div css={{ color: 'gray', fontSize: '1.5rem', fontStyle: 'italic' }}>
            par {data.recordingsYaml.recording.dcterms_creator}
          </div>
        )}
        <div css={{ color: 'darkgray', fontSize: '1.5rem' }}>
          {`Publié le ${formatYYYYMMDD(
            data.recordingsYaml.recording.dcterms_date
          )}`}
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
              color: TEAL,
              fontSize: '1.25rem',
              fontVariant: 'small-caps',
              transition: `color ${OUT}s`,
              width: 135,
              '&:hover': {
                color: 'DarkTurquoise',
                transition: `color ${IN}s`,
              },
            }}
            ref={buttonRef}
          >
            Lecture
          </button>
        </div>
        {/* MERCURE METADATA */}
        {data.recordingsYaml.mg.dcterms_title && (
          <React.Fragment>
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
            <div css={{ fontSize: '2.25rem' }}>
              <span css={{ fontStyle: 'italic' }}>Mercure galant</span>,{' '}
              {formatYYYYMMDD(data.recordingsYaml.mg.dcterms_date)}
            </div>
            {data.recordingsYaml.mg.dcterms_title !==
              data.recordingsYaml.recording.dcterms_title && (
              <div css={{ fontSize: '1.69rem', fontStyle: 'italic' }}>
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
                css={{
                  fontSize: '1.5rem',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Édition OBVIL ({data.recordingsYaml.mg.dcterms_identifier})
              </a>
            </div>
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
          </React.Fragment>
        )}
        <div css={{ margin: '3rem 0' }}>
          <img
            src={data.picture.publicURL}
            alt={data.recordingsYaml.recording.dcterms_title}
            css={{
              borderRadius: '50%',
              boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.6)',
              margin: '2rem auto',
              maxHeight: PICTURE_SIZE * 2,
              maxWidth: PICTURE_SIZE * 2,
              minHeight: PICTURE_SIZE * 2,
              minWidth: PICTURE_SIZE * 2,
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    recordingsYaml(sherlock_uuid: { eq: $slug }) {
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
    picture: file(name: { eq: $slug }, extension: { eq: "jpg" }) {
      publicURL
    }
    audio: file(name: { eq: $slug }, extension: { eq: "mp3" }) {
      publicURL
    }
  }
`

export default Recording
