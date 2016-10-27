/*!

  © Nick Freear, 2016-09-26 | License: MIT.
*/

(function (W) {

  'use strict';

  var JSON = W.JSON  // Derive "globals".
    , request = W.superagent
    , L = W.L  // Leaflet
    , _ = W._  // Lodash
    , CFG = W.MAP_CONFIG || {}
    ;

  var mymap = L.map(CFG.mapId).setView(CFG.latLng, CFG.zoom)
    , popup_template = _.template(CFG.popupTemplate)
    ;

  L.tileLayer(CFG.tileUrl, {
  //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 6,  //Was: 18,
    minZoom: 2,
    // Not needed! //id: 'your.mapbox.project.id',
    accessToken: CFG.accessToken
  }).addTo(mymap);

  request
    .get(CFG.geoJsonUrl)
    .then(function (response) {

    var geo_data = JSON.parse(response.text);

    W.console.error(geo_data);

    L.geoJson(geo_data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties[ CFG.checkProperty ]) {
            layer.bindPopup(popup_template(feature.properties));
        }
        else if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
      }
    }).addTo(mymap);

  }, function (error) {
    W.console.error('Superagent HTTP error.', error);
    W.alert('HTTP error. ' + error);
  });

}(window));
