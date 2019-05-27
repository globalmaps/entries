const fs = require('fs')
const countries = require('i18n-iso-countries')

let src = JSON.parse(fs.readFileSync('tmp.json'))
let dst = {}

for (let i in src.entries) {
  const r = src.entries[i]
  const iso3cd = countries.alpha2ToAlpha3(r[0].toUpperCase())
  dst[iso3cd] = {
    iso2cd: r[0],
    iso3cd: iso3cd,
    name: countries.getName(r[0], 'en'),
    versions: r[1]
  }
}
console.log(JSON.stringify(dst))
