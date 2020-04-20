export const makeExtent = (_) => {
  let extent = Number(_.slice(2).slice(0, -1))
  const extent_m = Math.floor(extent / 60)
  const extent_s = Math.round(extent % 60)
  extent = extent_s + ' seconde' + (extent_s >= 2 ? 's' : '')
  if (extent_m)
    extent = extent_m + ' minute' + (extent_m >= 2 ? 's' : '') + ' ' + extent

  return extent
}
