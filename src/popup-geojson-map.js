/*!
  popup-geojson-map Javascript.

  © Nick Freear, 2016-09-26 | License: MIT.
*/

module.exports = function (WIN, /* superagent, */ lodashish, VERSION) {
  'use strict';

  const defaults = {
    latLng: [51.505, -0.09], // London, UK!
    zoom: 3,
    minZoom: 2,
    maxZoom: 12, // Was: 6, 18,
    opacity: 1,
    mapId: 'mapid',
    popupTemplate: '#popup-template',
    templateSettings: {},
    checkProperty: 'audio_url',
    geoJson: '{cdn}/data/world-audio-geo.json',
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abc',
    // tileUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    // tileUrl: 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
    // tileUrl: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
    // subdomains: '0123',
    // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    lodashish: true,
    icon: 'default', // 'default', 'maki' or 'div'
    iconUrl: 'https://unpkg.com/@mapbox/maki@4.0.0/icons/{icon}-15.svg',
    cdn: 'https://unpkg.com/geojson-popup@' + VERSION, // Was: '@1.1.0-beta'
    accessToken: '<%= ENV.ACCESS_TOKEN %>' // No access token required for OpenStreetMap!
  };

  const W = WIN || window;
  // const JSON = W.JSON;
  const L = W.L;
  const fetch = window.fetch;
  // const request = superagent;
  const CFG = lodashish.extend(defaults, W.MAP_CFG); // Order is significant!
  const _ = CFG.lodashish ? lodashish : W._;

  CFG.version = VERSION;

  if (typeof CFG.popupTemplate === 'string') {
    CFG.popupTemplate = W.document.querySelector(CFG.popupTemplate).innerText;
  }

  W.console.debug('Map config:', CFG);

  const mymap = L.map(CFG.mapId).setView(CFG.latLng, CFG.zoom);
  const popupTemplateFn = _.template(CFG.popupTemplate, null, CFG.templateSettings);
  const accessToken = _.template(CFG.accessToken);

  L.tileLayer(CFG.tileUrl, {
    subdomains: CFG.subdomains,
    attribution: CFG.attribution,
    maxZoom: CFG.maxZoom,
    minZoom: CFG.minZoom,
    // Not needed! //id: 'your.mapbox.project.id',
    accessToken: accessToken(W.ENV || { ENV: {} })
  }).addTo(mymap);

  fetch(lodashish.cdn(CFG))
    .then(response => response.json())
    .then(geoData => {
      console.debug('GeoJSON:', geoData);

      L.geoJson(geoData, {
        pointToLayer: function (/* geoJsonPoint */ point, latlng) {
          if (CFG.icon === 'default') {
            return L.marker(latlng);
          }

          const props = point.properties;
          const icon = props['marker-symbol'];
          const cls = props['marker-class'] || '';
          const html = props['marker-html'] || '';
          const clsName = 'icon-{icon} icon-{cls}'.replace('{icon}', icon).replace('{cls}', cls);

          console.warn('Point:', point);

          if (CFG.icon === 'div') {
            return L.marker(latlng, { icon: L.divIcon({ className: clsName, html: html }) });
          }

          const makiIcon = L.icon({
            iconSize: [18, 18], // [ 27, 27 ],
            iconAnchor: [9, 18], // [ 13, 27 ],
            popupAnchor: [1, -19], // [ 1, -24 ],
            iconUrl: CFG.iconUrl.replace('{icon}', icon),
            className: clsName
          });
          return L.marker(latlng, { icon: makiIcon });
        },

        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties[CFG.checkProperty]) {
            layer.bindPopup(popupTemplateFn(feature.properties));
          } else if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
          }
        }
      }).addTo(mymap);
    })
    .catch(error => console.error('HTTP error.', error, CFG.geoJson));
};
