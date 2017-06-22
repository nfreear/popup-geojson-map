
[![Build status: Travis-CI][travis-icon]][travis-ci]

# popup-geojson-map.js

Add GeoJSON-based templated popups to a Leaflet map. See the audio-player example(s).

Easily create interactive maps, with popups containing structured data, for example, audio players.

Software & specs:
* [GeoJSON][]
* [Leaflet.JS][]
* [Lodash][] or [Underscore.js][]
* [SuperAgent][]

Map tiles:
* [Leaflet providers][prov] — _default / free._
* [Mapbox][]
* [National Library of Scotland - Historic Maps][NLS]

Example data & audio files:
* [Freesound][]
* [Commons][]

## Rename

popup-geojson-map
geojson-popup
json-map-popup

I'm renaming the NPM package from `popup-geojson-map` to the clearer `geojson-popup`.
(I'll probably re-name the GitHub repo. too.) Sorry for any hassle!

## Build & test

```sh
npm i popup-geojson-map
npm start
npm test
```

## Usage

```html
<p id="mapid"></p>

<script type="text/html" id="popup-template">
  <div class="audio-popup">
    <h2><%= title %></h2>
    <audio src="<%= audio_url %>" controls ></audio>
  </div>
</script>

<script> MAP_CFG = { geoJson: 'data/world-audio-geo.json' } </script>

<script src="https://unpkg.com/popup-geojson-map@1.1.0-beta#..js"></script>
```

GeoJSON:
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


---

* NPM:    [popup-geojson-map][npm]
* GitHub: [nfreear/popup-geojson-map][]
* Gist:   [nfreear/fd10..][gist]

---
&copy; 2016-2017 Nick Freear, | License: [MIT][].


[MIT]: https://nfreear.mit-license.org/2016-2017 "MIT License | © 2016-2017 Nick Freear (date: 2016-09-26)"
[travis-icon]: https://travis-ci.org/nfreear/popup-geojson-map.svg
[travis-ci]: https://travis-ci.org/nfreear/popup-geojson-map "Build status – Travis-CI"
[npm]: https://npmjs.com/package/popup-geojson-map
[nfreear/popup-geojson-map]: https://github.com/nfreear/popup-geojson-map
[gist]: https://gist.github.com/nfreear/fd1005a2af7a8166862011b8fcb8a821 "Original JS"
[resume]: https://gist.github.com/nfreear/cceecc6e1cabdf8f8f4302aaed10923d "Resume GeoJSON"

[RFC]: https://tools.ietf.org/html/rfc7946 "The GeoJSON Format, August 2016."
[GeoJSON]: http://geojson.org/
[Leaflet.JS]: http://leafletjs.com/examples/geojson.html
[SuperAgent]: https://visionmedia.github.io/superagent/
[Superagent-X]: http://smalljs.org/ajax/superagent/
[Lodash]: https://lodash.com/
[Underscore.js]: http://underscorejs.org/
[Freesound]: https://freesound.org/search/?q=metro "Freesound search: 'metro'"
[Commons]: https://commons.wikimedia.org/wiki/Category:Audio_files_of_music
[prov]: https://leaflet-extras.github.io/leaflet-providers/preview/
  "'This page shows mini maps for all the layers available in Leaflet-providers.'"
[Mapbox]: https://www.mapbox.com/
[NLS]: http://maps.nls.uk/projects/api/ "National Library of Scotland - Historic Maps API."

[end]: //end
