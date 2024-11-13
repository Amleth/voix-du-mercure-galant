/** @jsx jsx */

import { jsx } from '@emotion/react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import { HEIGHT as BOTTOM_PLAYER_HEIGHT } from '../components/BottomPlayer'

const IN = 0.2
const OUT = 0.5

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  let siteTitle = data.site.siteMetadata.title
  if (siteTitle === 'Voix du Mercure Galant') {
    siteTitle = (
      <React.Fragment>
        <div>Voix du</div>
        <div>Mercure Galant</div>
      </React.Fragment>
    )
  }

  return (
    <div>
      <div css={{ margin: '2rem 0', textAlign: 'center' }}>
        <div css={{ display: 'flex', justifyContent: 'center' }}>
          {TITLE_SYMBOL_LEFT}
          {TITLE(siteTitle)}
          {TITLE_SYMBOL_RIGHT}
        </div>
      </div>
      <nav
        css={{
          alignItems: 'center',
          display: 'flex',
          fontSize: '2rem',
          fontVariant: 'small-caps',
          justifyContent: 'center',
          listStyleType: 'none',
          marginBottom: '2rem',
          width: '100%',
        }}
      >
        {MENU_ITEM_PRÉSENTATION}
        {MENU_SEP}
        {MENU_ITEM_ENREGISTREMENTS}
      </nav>
      <div css={{ paddingBottom: BOTTOM_PLAYER_HEIGHT }}>{children}</div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////
// MENU
////////////////////////////////////////////////////////////////////////////////

const MENU_ITEM_PRÉSENTATION = (
  <Link
    to={`/about`}
    css={{
      color: 'gray',
      cursor: 'default',
      textAlign: 'right',
      textDecoration: 'none',
      transition: `color ${OUT}s`,
      width: '100%',
      '&:hover': {
        color: '#1693A5',
        transition: `color ${IN}s`,
      },
    }}
  >
    Présentation
  </Link>
)
const MENU_ITEM_ENREGISTREMENTS = (
  <Link
    to={`/`}
    css={{
      color: 'gray',
      cursor: 'default',
      textDecoration: 'none',
      transition: `color ${OUT}s`,
      width: '100%',
      '&:hover': {
        color: '#1693A5',
        transition: `color ${IN}s`,
      },
    }}
  >
    Enregistrements
  </Link>
)

const MENU_SEP = (
  <div
    css={{
      color: 'gray',
      height: 50,
      margin: 0, //'0 2rem 0 2rem',
      width: 100,
    }}
  >
    <svg css={{ height: 50, width: 100 }} xmlns="http://www.w3.org/2000/svg">
      <text
        fill="gray"
        fontFamily="IMFELLFlowers2"
        fontSize="40"
        height="50px"
        textAnchor="middle"
        x="50"
        y="44"
      >
        E
      </text>
    </svg>
  </div>
)

////////////////////////////////////////////////////////////////////////////////
// TITLE
////////////////////////////////////////////////////////////////////////////////

const TITLE = (siteTitle) => (
  <Link
    to="/"
    css={{
      cursor: 'default',
      margin: '0 3rem',
      textDecoration: 'none',
    }}
  >
    <h1
      css={{
        color: 'black',
        fontSize: '3rem',
        letterSpacing: '7px',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
    >
      {siteTitle}
    </h1>
  </Link>
)
const TITLE_SYMBOL_LEFT = (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      fontFamily: 'IMFellFlowers1',
      fontSize: '4rem',
      paddingBottom: '20px',
    }}
  >
    O
  </div>
)
const TITLE_SYMBOL_RIGHT = (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      fontFamily: 'IMFellFlowers1',
      fontSize: '4rem',
      paddingBottom: '20px',
    }}
  >
    Q
  </div>
)

export default Layout
