const data = require('./entries.json')

const colors = {
  text: ['rgb', 255, 255, 255],
  active: ['rgb', 91, 146, 229],
  inactive: ['rgb', 250, 250, 250]
}

const versionString = n => {
  const s = n.toString()
  return `${s.charAt(0)}.${s.charAt(1)}`
}

const overlay = document.getElementById('overlay')
const country = document.getElementById('country')
const description = document.getElementById('description')

fetch(
  window.confirm('Are you using TabularMaps?')
    ? 'https://tabularmaps.github.io/8bit-tile/style.json'
    : 'https://un-vector-tile-toolkit.github.io/tentatiles/style.json'
).then((response) => response.json()).then(style => {
  for (let layer of style.layers) {
    if (layer.id === 'bnda') {
      layer.paint['fill-color'] = [
        'match',
        ['get', 'iso3cd'],
        Object.keys(data),
        colors.active,
        colors.inactive
      ]
    }
    if (layer.id === 'text') {
      layer.paint['text-color'] = [
        'match',
        ['get', 'iso3cd'],
        Object.keys(data),
        colors.text,
        colors.inactive
      ]
    }
  }
  const map = new mapboxgl.Map({
    container: 'map',
    maxZoom: 2,
    style: style,
    attributionControl: true,
    hash: true
  })

  map.on('mousemove', (e) => {
    const f = map.queryRenderedFeatures(e.point)[0]
    if (!f) return
    overlay.classList.remove('inactive', 'active')
    const iso3cd = f.properties.iso3cd
    if (data[iso3cd]) {
      overlay.classList.add('active')
      country.textContent = f.properties.maplab
      if (data[iso3cd]) {
        description.textContent = 
          'Click to download Global Map archive data version ' + 
          data[iso3cd].versions
            .map(v => versionString(v))
            .join(' and ')
      } else {
        description.textContent = ''
      }
    } else {
      overlay.classList.add('inactive')
    }
  })

  map.on('click', (e) => {
    const f = map.queryRenderedFeatures(e.point)[0]
    if (!f) return
    const r = data[f.properties.iso3cd]
    for (let version of r.versions) {
      const url = 'https://github.com/globalmaps/gm'
        + r.iso2cd + version + '/archive/master.zip'
      window.confirm('Do you download Global Map archive data for ' + 
        `${f.properties.maplab} (version ${versionString(version)})?`)
        ? window.open(url)
        : null
    }
  })
})
