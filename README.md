
[![Build status: Travis-CI][travis-icon]][travis-ci]

# popup-geojson-map.js

Browser Javascript library to create a map, with popups containing structured data,
for example, audio players.

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


## Usage

```sh
npm install

npm run copy-env

npm run server

npm test
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
