
[![Build status: Travis-CI][travis-icon]][travis-ci]

# popup-geojson-map.js

Easily create interactive maps, with popups containing structured data, for example, audio players.

Software & specs:
* [GeoJSON][]
* [Leaflet.JS][]
* [Lodash][] or [Underscore.js][]
* [SuperAgent][]

Map tiles:
* [Mapbox][]
* [National Library of Scotland - Historic Maps][NLS]

Example data & audio files:
* [Freesound][]
* [Commons][]


## Build & test

```sh
npm install

npm run copy-env

npm run server

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

<script>
  // Mostly use defaults!
  window.MAP_CONFIG = {
    popupTemplate: document.querySelector('#popup-template').innerText,
    geoJsonUrl: 'data/world-audio-geo-data.json'
  }
</script>

<script src="src/popup-geojson-map.js"></script>
```

GeoJSON:
```json
"features": [
  {
    "type": "Feature",
    "properties": {
      "title": "raining on the roof of Jennie Lee Building.wav",
      "audio_url": "http://freesound.org/data/previews/92/92744_1315834-lq.mp3"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [ -0.7110, 52.0241 ]
    }
  }
]
```


---

* GitHub: [nfreear/audio-popup-map][]
* Gist:   [nfreear/fd10..][gist]

---
&copy; Nick Freear, 2016-09-26 | License: [MIT][].

[MIT]: https://nfreear.mit-license.org "The MIT License | © 2016 Nick Freear"
[travis-icon]: https://travis-ci.org/nfreear/popup-geojson-map.svg
[travis-ci]: https://travis-ci.org/nfreear/popup-geojson-map "Build status – Travis-CI"
[nfreear/audio-popup-map]: https://github.com/nfreear/audio-popup-map
[gist]: https://gist.github.com/nfreear/fd1005a2af7a8166862011b8fcb8a821
[resume]: https://gist.github.com/nfreear/cceecc6e1cabdf8f8f4302aaed10923d "Resume GeoJSON"

[RFC]: https://tools.ietf.org/html/rfc7946 "The GeoJSON Format, August 2016."
[GeoJSON]: http://geojson.org/
[Leaflet.JS]: http://leafletjs.com/examples/geojson.html
[SuperAgent]: https://visionmedia.github.io/superagent/
[Superagent-X]: http://smalljs.org/ajax/superagent/
[Lodash]: https://lodash.com/
[Underscore.js]: http://underscorejs.org/
[Freesound]: http://www.freesound.org/search/?q=metro "Freesound search: 'metro'"
[Commons]: https://commons.wikimedia.org/wiki/Category:Audio_files_of_music
[Mapbox]: https://www.mapbox.com/
[NLS]: http://maps.nls.uk/projects/api/ "National Library of Scotland - Historic Maps API."

[end]: //end
