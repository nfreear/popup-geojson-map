
[![Node.js CI][gci-icon]][gci]
[![Build status — Travis-CI][travis-icon]][travis]
[![geojson-popup on Npmjs][npm-icon]][npm]
[![js-semistandard-style][semi-icon]][semi]
[![License][license-icon]][mit]
[![Total downloads - NPMJS.com][downl-icon]][npm]

# nfreear / geojson-popup

Add GeoJSON-based templated popups to a [Leaflet][] map. See the audio-player example(s).

Easily create interactive maps, with popups containing structured data, for example, audio players.

Read the [introductory blog post][blog].

## Changelog

* [Release notes on GitHub][rel]

## Build & test

```sh
git clone https://github.com/nfreear/popup-geojson-map geojson-popup
cd geojson-popup
npm install && npm run build && npm test
npm start
```

## Usage

HTML containing a template, with placeholders, `title` and `audio_url`

```html
<p id="mapid"></p>

<script type="text/html" id="popup-template">
  <div class="audio-popup">
    <h2><%= title %></h2>
    <audio src="<%= audio_url %>" controls ></audio>
  </div>
</script>

<script> MAP_CFG = { geoJson: '{cdn}/data/world-audio-geo.json' } </script>

<script src="https://unpkg.com/geojson-popup@2.4.0#._.js"></script>
```

GeoJSON, with properties corresponding to the template placeholders, `title` and `audio_url`:

```json
"features": [
  {
    "type": "Feature",
    "properties": {
      "title": "raining on the roof of Jennie Lee Building.wav",
      "audio_url": "https://freesound.org/data/previews/92/92744_1315834-lq.mp3"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [ -0.7110, 52.0241 ]
    }
  }
]
```

### `marker-symbol`

[GeoJSON with `marker-symbol`][ev], and built in support for [Maki icons][maki]:

```html
<script>
MAP_CFG = {
  geoJson: 'https://example.org/...charging-map.geo.json',
  icon: 'maki' // 'default', 'maki' or 'div'.
}
</script>
```

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "marker-symbol": "fuel",
        "marker-class": "custom",
        "marker-html": "<span>HTML</span>",
        "title": "Estates charging point (7 kW)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ -0.71138, 52.02565 ]
      }
    }
  ]
}
```

---

Software & specs:
* [GeoJSON][]
* [Leaflet][]
* [Lodash.template][_tpl] - _bundled_
* [SuperAgent][] - _bundled_

Map tiles:
* [Leaflet providers][prov] — _default / free._
* [Mapbox][]
* [National Library of Scotland - Historic Maps][NLS]

Sources for example data & audio files:
* [Freesound][]
* [Commons][]

## Rename

I'm renaming the NPM package from [`popup-geojson-map`][npm-old] to the clearer [`geojson-popup`][npm].
(I'll probably re-name the GitHub repo. too.) _Sorry for any hassle!_


---

* NPM:    [geojson-popup][npm]
* GitHub: [nfreear/popup-geojson-map][]
* Gist:   [nfreear/fd10..][gist]

---
&copy; 2016-2021 Nick Freear, | License: [MIT][].


[blog]: https://nick.freear.org.uk/2017/06/27/geojson-popup-leaflet.html?utm_source=npm
[MIT]: https://nfreear.mit-license.org/2016-2021 "MIT License | © 2016-2021 Nick Freear (date: 2016-09-26)"
[travis-icon]: https://travis-ci.org/nfreear/popup-geojson-map.svg
[travis]: https://travis-ci.org/nfreear/popup-geojson-map "Build status – Travis-CI"
[npm-old]: https://npmjs.com/package/popup-geojson-map
[npm]: https://npmjs.com/package/geojson-popup
[nfreear/popup-geojson-map]: https://github.com/nfreear/popup-geojson-map
[rel]: https://github.com/nfreear/popup-geojson-map/releases
[gist]: https://gist.github.com/nfreear/fd1005a2af7a8166862011b8fcb8a821 "Gist: original JS (27-Sep-2016)"
[resume]: https://gist.github.com/nfreear/cceecc6e1cabdf8f8f4302aaed10923d "Resume GeoJSON"
[ev]: https://gist.github.com/nfreear/d1cb9d672dd33511056fa472c9bde36f "OU ev-charging GeoJSON"

[RFC]: https://tools.ietf.org/html/rfc7946 "The GeoJSON Format, August 2016."
[GeoJSON]: https://geojson.org/
[Leaflet]: https://leafletjs.com/examples/geojson/ "Using GeoJSON with Leaflet"
[SuperAgent]: https://visionmedia.github.io/superagent/
[Superagent-X]: http://smalljs.org/ajax/superagent/
[Lodash]: https://lodash.com/
[_tpl]: https://npmjs.com/package/lodash.template
[Underscore.js]: https://underscorejs.org/
[Freesound]: https://freesound.org/search/?q=metro "Freesound search: 'metro'"
[Commons]: https://commons.wikimedia.org/wiki/Category:Audio_files_of_music
[prov]: https://leaflet-extras.github.io/leaflet-providers/preview/
  "'This page shows mini maps for all the layers available in Leaflet-providers.'"
[Mapbox]: https://www.mapbox.com/
[NLS]: http://maps.nls.uk/projects/api/ "National Library of Scotland - Historic Maps API."
[maki]: https://www.mapbox.com/maki-icons/ "Maki is an icon set made for map designers."

[semi]: https://github.com/Flet/semistandard
[semi-icon]: https://img.shields.io/badge/code_style-semistandard-brightgreen.svg
  "Javascript coding style — 'semistandard'"
[npm-icon]: https://img.shields.io/npm/v/geojson-popup.svg "Latest version ~ on NPM"
[license-icon]: https://img.shields.io/npm/l/geojson-popup.svg
[downl-icon]: https://img.shields.io/npm/dt/geojson-popup.svg "Count of total downloads ~NPM"
[gci]: https://github.com/nfreear/popup-geojson-map/actions/workflows/node.js.yml
[gci-icon]: https://github.com/nfreear/popup-geojson-map/actions/workflows/node.js.yml/badge.svg

<!-- Easily create interactive maps, with popups containing structured data, for example, audio players. -->
[End]: //.
