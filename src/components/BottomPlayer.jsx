/** @jsx jsx */

import { jsx } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPause,
  faPlay,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { formatYYYYMMDD } from '../common/helpers'
import { TEAL, IN, OUT } from '../common/style'

export const HEIGHT = 82

const cssButton = {
  fontSize: '30px',
  height: `${HEIGHT / 2}px`,
  margin: '0 0 0 10px',
  transition: `color ${OUT}s`,
  '&:hover': {
    color: 'DarkTurquoise',
    transition: `color ${IN}s`,
  },
}

const BottomPlayer = ({ playList, playListIndex_ }) => {
  const [playListIndex, setPlayListIndex] = useState(0)
  const [playState, setPlayState] = useState('pause')
  const [navEnabled, setNavEnabled] = useState(false)
  const waveformRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    setPlayListIndex(playListIndex_)
  }, [playListIndex_])

  useEffect(() => {
    let wavesurfer
    if (waveformRef.current) {
      setNavEnabled(false)
      const mp3 = playList[playListIndex].mp3
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        cursorColor: 'white',
        height: HEIGHT / 2,
        progressColor: TEAL,
        waveColor: 'aqua',
      })
      wavesurfer.load(mp3)
      wavesurfer.on('finish', () => {
        if (playList.length === 1) {
          wavesurfer.seekTo(0)
          wavesurfer.play()
        }
        nextAndLoop()
      })
      wavesurfer.on('pause', () => setPlayState('pause'))
      wavesurfer.on('play', () => setPlayState('play'))
      wavesurfer.on('ready', () => {
        setNavEnabled(true)
        if (playState === 'play') wavesurfer.play()
      })
    }
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', () => wavesurfer.playPause())
    }
    return () => {
      try {
        wavesurfer.destroy()
      } catch (e) {}
    }
  }, [playList[playListIndex]])

  const next = () => {
    if (playListIndex < playList.length - 1) {
      setPlayListIndex(playListIndex + 1)
    }
  }
  const nextAndLoop = () => {
    if (playListIndex < playList.length - 1) {
      setPlayListIndex(playListIndex + 1)
    } else setPlayListIndex(0)
  }
  const prev = () => {
    if (playListIndex > 0) {
      setPlayListIndex(playListIndex - 1)
    }
  }

  return (
    <div css={{ userSelect: 'none' }}>
      <div
        css={{
          color: 'white',
          display: 'flex',
        }}
      >
        <div ref={buttonRef}>
          {playState === 'play' && (
            <FontAwesomeIcon css={{ ...cssButton }} icon={faPause} />
          )}
          {playState === 'pause' && (
            <FontAwesomeIcon css={{ ...cssButton }} icon={faPlay} />
          )}
        </div>
        <div>
          <FontAwesomeIcon
            css={{ ...cssButton, pointerEvents: navEnabled ? 'auto' : 'none' }}
            icon={faChevronLeft}
            onClick={prev}
          />
        </div>
        <div>
          <FontAwesomeIcon
            css={{ ...cssButton, pointerEvents: navEnabled ? 'auto' : 'none' }}
            icon={faChevronRight}
            onClick={next}
          />
        </div>
        <div
          css={{
            fontSize: '1.75rem',
            textAlign: 'center',
            minWidth: '82px',
          }}
        >
          {playListIndex + 1}/{playList.length}
        </div>
        <div
          css={{
            flexGrow: 1,
            fontSize: '1.5rem',
            paddingRight: '1em',
            textAlign: 'right',
          }}
        >
          <a
            css={{
              color: 'white',
              transition: `color ${OUT}s`,
              '&:hover': {
                color: 'DarkTurquoise',
                transition: `color ${IN}s`,
              },
            }}
            href={`#${playList[playListIndex].sherlock_uuid}`}
          >
            {playList[playListIndex].recording.dcterms_title} (
            {formatYYYYMMDD(playList[playListIndex].mg.dcterms_date)})
          </a>
        </div>
      </div>
      <div ref={waveformRef}></div>
    </div>
  )
}

export default BottomPlayer
