export const makeExtent = (_) => {
  let extent = Number(_.slice(2).slice(0, -1))
  const extent_m = Math.floor(extent / 60)
  const extent_s = Math.round(extent % 60)

  return extent_m + "'" + extent_s + '"'
}

const MONTHS = {
  '01': 'janvier',
  '02': 'février',
  '03': 'mars',
  '04': 'avril',
  '05': 'mai',
  '06': 'juin',
  '07': 'juillet',
  '08': 'août',
  '09': 'septembre',
  '10': 'octobre',
  '11': 'novembre',
  '12': 'décembre',
}

export const formatYYYYMMDD = (_) => {
  _ = _.toString()
  if (_.length === 1) return '—'
  if (_.length === 8) {
    return _.slice(6, 8) + ' ' + MONTHS[_.slice(4, 6)] + ' ' + _.slice(0, 4)
  }
  if (_.length === 6) {
    return MONTHS[_.slice(4, 6)] + ' ' + _.slice(0, 4)
  }
}

export const sortByDateMg = (a, b) => {
  let delta = a.node.mg.dcterms_date - b.node.mg.dcterms_date
  return delta !== 0
    ? -delta
    : a.node.mg.dcterms_title.localeCompare(b.node.mg.dcterms_title)
}
export const sortByDateVmg = (a, b) => {
  let delta = a.node.recording.dcterms_date - b.node.recording.dcterms_date
  return delta !== 0
    ? -delta
    : a.node.recording.dcterms_title.localeCompare(
        b.node.recording.dcterms_title
      )
}
