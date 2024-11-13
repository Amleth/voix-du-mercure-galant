/** @jsx jsx */

import { jsx } from '@emotion/react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout>
      <div
        css={{
          fontSize: '1.3rem',
          margin: '5rem auto',
          maxWidth: 800,
          textAlign: 'justify',
          textIndent: '1em',

          '& a:hover': {
            color: 'DarkTurquoise',
          },
        }}
      >
        <p>Les « Voix du <em>Mercure galant</em> » sont nées d’un pari et d’une
          expérience.</p>
        <p>Réseau social avant l’heure, le <em>Mercure galant</em>, mensuel
          fondé par J. Donneau de Visé en 1672, s’est nourri de l’activité des
          « ruelles » et des cénacles lettrés de la fin du XVIIe siècle, lieux de
          sociabilité déterminants pour la production littéraire et musicale. Les
          textes publiés dans le <em>Mercure galant</em> sont aujourd’hui étudiés,
          notamment sous l’angle de la galanterie. Les airs font eux aussi l’objet
          d’analyses sérielles ou spécifiques. Cependant, l’ensemble de cette
          production reste muette. Les airs demeurent peu connus du public et des
          musiciens, les textes sont presque toujours appréhendés à partir d’une
          lecture silencieuse. Or la plupart d’entre eux étaient destinés à la
          lecture à haute voix, certains étaient conçus oralement et beaucoup
          étaient même rédigés collectivement. Rendre ces textes et ces musiques à
          leur nature sonore leur restitue une dimension sensible qui modifie la
          perception que nous en avons. Le pari consiste donc à nous donner
          collectivement les moyens d’écouter des extraits du <em>Mercure
            galant</em> et, au-delà du plaisir sonore, de réinterroger ces textes et
          ces musiques à l’aune d’une perception modifiée par l’écoute. L’approche
          génétique, comme l’analyse de la valeur, l’étude de la réception ou
          encore la réflexion sur les phénomènes de réemploi pourraient s’en
          trouver modifiées.</p>
        <p>L’expérience collective du confinement, qui a compromis la vitalité
          de l’activité artistique et bouleversé le rapport à soi et aux autres, a
          été l’occasion de lancer une expérience participative. « Le Mercure
          confiné », expérimentation scientifique, artistique et ludique, a invité
          musiciens, comédiens, lecteurs, amateurs et professionnels, passionnés
          du XVII<sup>e</sup> siècle ou simples curieux, à lire, déclamer,
          chanter, jouer les airs, les fables, les histoires galantes, les
          lettres, les nouvelles qui composent le <em>Mercure galant</em>, avec
          les moyens artistiques et techniques très limités qui étaient alors les
          nôtres, pour partager, malgré l’isolement, ces interprétations, et faire
          ainsi écho au salon dématérialisé qu’a été le <em>Mercure
            galant</em>.</p>
        <p>Le site <em>Voix du Mercure galant</em> a publié ces premières
          contributions et poursuivi l’aventure, dans de meilleures conditions.
          Une fois retrouvés sa basse continue, son souffle ou ses compagnons de
          musique, des séances d’enregistrements sont proposées à ceux qui le
          souhaitent, notamment aux étudiants et aux élèves des conservatoires. La
          rubrique ‘récitation’ s’adresse spécialement aux enfants ; les
          instrumentistes peuvent aussi interpréter les succès du temps évoqués
          dans le <em>Mercure galant</em>, les chanteurs nous envoyer d’autres
          airs contemporains. Vous pouvez signer vos contributions ou non. Nous
          pouvons aussi renvoyer vers vos propres sites ou chaînes.</p>
        <p>Vous êtes collectivement invités à participer !</p>
        <p>Pour accompagner les <em>Voix du Mercure galant</em> dans leur
          découverte de ces objets virtuellement sonores, le programme <a
            href="https://www.iremus.cnrs.fr/fr/programme-de-recherche/mercure-galant"><em>Mercure
              galant</em></a> de l’IReMus (Institut de recherche en musicologie,
          CNRS) met à disposition des ressources numériques issues de l’édition
          parisienne du <em>Mercure galant</em>, édition également accessible sur
          <em><a
            href="https://gallica.bnf.fr/ark:/12148/cb40216887k/date">Gallica</a> </em>:</p>
        <p>Une <a
          href="http://132.227.201.10:8086/projets/mercure-galant">édition en
          TEI</a> des articles relatifs à la littérature, à la musique et à la vie
          artistique, ainsi qu’à l’Amérique, enrichie des planches publiées dans
          le périodique : 737 airs en fac-similés et 499 estampes ;</p>
        <p>Une édition moderne, en cours, des partitions, qui peuvent vous être
          communiquées sur demande.</p>
        <p>S’y ajouteront bientôt une indexation fine des articles sur la
          musique et les spectacles, qui s’appuiera sur un vaste <a
            href="http://chateauversailles-recherche.fr/francais/recherche/projets-scientifiques-et-recherche-appliquee/thesaurus-historique-sur-la-france-de-l-ancien-regime-2016">référentiel
            de l’Ancien Régime</a>.</p>
        <p>À ce jour, la fouille du texte en accès libre est limitée. Toutefois,
          l’équipe « Mercure galant » de l’IReMus peut vous aider dans la
          recherche d’informations, de textes ou de musiques, en fac-similés ou en
          notation moderne.</p>
        <p>Contact : <a
          href="mailto:mercure.galant.2020@gmail.com">mercure.galant.2020@gmail.com</a></p>
      </div>
    </Layout>
  )
}

export default About
