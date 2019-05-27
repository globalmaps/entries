(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var data = require('./entries.json');

var colors = {
  text: ['rgb', 255, 255, 255],
  active: ['rgb', 91, 146, 229],
  inactive: ['rgb', 250, 250, 250]
};

var versionString = function versionString(n) {
  var s = n.toString();
  return "".concat(s.charAt(0), ".").concat(s.charAt(1));
};

var overlay = document.getElementById('overlay');
var country = document.getElementById('country');
var description = document.getElementById('description');
fetch(window.confirm('Are you using TabularMaps?') ? 'https://tabularmaps.github.io/8bit-tile/style.json' : 'https://un-vector-tile-toolkit.github.io/tentatiles/style.json').then(function (response) {
  return response.json();
}).then(function (style) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = style.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var layer = _step.value;

      if (layer.id === 'bnda') {
        layer.paint['fill-color'] = ['match', ['get', 'iso3cd'], Object.keys(data), colors.active, colors.inactive];
      }

      if (layer.id === 'text') {
        layer.paint['text-color'] = ['match', ['get', 'iso3cd'], Object.keys(data), colors.text, colors.inactive];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var map = new mapboxgl.Map({
    container: 'map',
    maxZoom: 2,
    style: style,
    attributionControl: true,
    hash: true,
    renderWorldCopies: false
  });
  map.on('mousemove', function (e) {
    var f = map.queryRenderedFeatures(e.point)[0];
    if (!f) return;
    overlay.classList.remove('inactive', 'active');
    var iso3cd = f.properties.iso3cd;

    if (data[iso3cd]) {
      overlay.classList.add('active');
      country.textContent = f.properties.maplab;

      if (data[iso3cd]) {
        description.textContent = 'Click to download Global Map archive data version ' + data[iso3cd].versions.map(function (v) {
          return versionString(v);
        }).join(' and ');
      } else {
        description.textContent = '';
      }
    } else {
      overlay.classList.add('inactive');
    }
  });
  map.on('click', function (e) {
    var f = map.queryRenderedFeatures(e.point)[0];
    if (!f) return;
    var r = data[f.properties.iso3cd];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = r.versions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var version = _step2.value;
        var url = 'https://github.com/globalmaps/gm' + r.iso2cd + version + '/archive/master.zip';
        window.confirm('Do you download Global Map archive data for ' + "".concat(f.properties.maplab, " (version ").concat(versionString(version), ")?")) ? window.open(url) : null;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
});

},{"./entries.json":2}],2:[function(require,module,exports){
module.exports={"COG":{"iso2cd":"cg","iso3cd":"COG","name":"Congo","versions":[10,20]},"COD":{"iso2cd":"cd","iso3cd":"COD","name":"Congo, the Democratic Republic of the","versions":[10]},"ETH":{"iso2cd":"et","iso3cd":"ETH","name":"Ethiopia","versions":[10,20]},"KEN":{"iso2cd":"ke","iso3cd":"KEN","name":"Kenya","versions":[10]},"SDN":{"iso2cd":"sd","iso3cd":"SDN","name":"Sudan","versions":[10]},"DZA":{"iso2cd":"dz","iso3cd":"DZA","name":"Algeria","versions":[10,20]},"TUN":{"iso2cd":"tn","iso3cd":"TUN","name":"Tunisia","versions":[10]},"BWA":{"iso2cd":"bw","iso3cd":"BWA","name":"Botswana","versions":[10,20]},"MUS":{"iso2cd":"mu","iso3cd":"MUS","name":"Mauritius","versions":[10]},"MOZ":{"iso2cd":"mz","iso3cd":"MOZ","name":"Mozambique","versions":[10,20]},"ZAF":{"iso2cd":"za","iso3cd":"ZAF","name":"South Africa","versions":[10,11,20]},"SWZ":{"iso2cd":"sz","iso3cd":"SWZ","name":"Swaziland","versions":[10,20]},"ZMB":{"iso2cd":"zm","iso3cd":"ZMB","name":"Zambia","versions":[20]},"BFA":{"iso2cd":"bf","iso3cd":"BFA","name":"Burkina Faso","versions":[10,20]},"CIV":{"iso2cd":"ci","iso3cd":"CIV","name":"Cote D'Ivoire","versions":[20]},"GHA":{"iso2cd":"gh","iso3cd":"GHA","name":"Ghana","versions":[10]},"GNB":{"iso2cd":"gw","iso3cd":"GNB","name":"Guinea-Bissau","versions":[10,20]},"MLI":{"iso2cd":"ml","iso3cd":"MLI","name":"Mali","versions":[20]},"NER":{"iso2cd":"ne","iso3cd":"NER","name":"Niger","versions":[10,20]},"SEN":{"iso2cd":"sn","iso3cd":"SEN","name":"Senegal","versions":[10,20]},"TGO":{"iso2cd":"tg","iso3cd":"TGO","name":"Togo","versions":[20]},"AFG":{"iso2cd":"af","iso3cd":"AFG","name":"Afghanistan","versions":[20]},"AZE":{"iso2cd":"az","iso3cd":"AZE","name":"Azerbaijan","versions":[10,20]},"BHR":{"iso2cd":"bh","iso3cd":"BHR","name":"Bahrain","versions":[10,20]},"BGD":{"iso2cd":"bd","iso3cd":"BGD","name":"Bangladesh","versions":[10,11,20]},"BTN":{"iso2cd":"bt","iso3cd":"BTN","name":"Bhutan","versions":[10,20]},"BRN":{"iso2cd":"bn","iso3cd":"BRN","name":"Brunei Darussalam","versions":[10,20]},"HKG":{"iso2cd":"hk","iso3cd":"HKG","name":"Hong Kong","versions":[10]},"IND":{"iso2cd":"in","iso3cd":"IND","name":"India","versions":[10,20]},"IDN":{"iso2cd":"id","iso3cd":"IDN","name":"Indonesia","versions":[10]},"IRN":{"iso2cd":"ir","iso3cd":"IRN","name":"Iran, Islamic Republic of","versions":[10,11,20]},"JOR":{"iso2cd":"jo","iso3cd":"JOR","name":"Jordan","versions":[10,20]},"KAZ":{"iso2cd":"kz","iso3cd":"KAZ","name":"Kazakhstan","versions":[10]},"KGZ":{"iso2cd":"kg","iso3cd":"KGZ","name":"Kyrgyzstan","versions":[10,20]},"LAO":{"iso2cd":"la","iso3cd":"LAO","name":"Lao People's Democratic Republic","versions":[10,20]},"LBN":{"iso2cd":"lb","iso3cd":"LBN","name":"Lebanon","versions":[10,20]},"MYS":{"iso2cd":"my","iso3cd":"MYS","name":"Malaysia","versions":[10,20]},"MNG":{"iso2cd":"mn","iso3cd":"MNG","name":"Mongolia","versions":[10,20]},"MMR":{"iso2cd":"mm","iso3cd":"MMR","name":"Myanmar","versions":[10]},"NPL":{"iso2cd":"np","iso3cd":"NPL","name":"Nepal","versions":[10,20]},"OMN":{"iso2cd":"om","iso3cd":"OMN","name":"Oman","versions":[10,20]},"PAK":{"iso2cd":"pk","iso3cd":"PAK","name":"Pakistan","versions":[10,20]},"PSE":{"iso2cd":"ps","iso3cd":"PSE","name":"Palestinian Territory, Occupied","versions":[10]},"PHL":{"iso2cd":"ph","iso3cd":"PHL","name":"Philippines","versions":[10]},"SAU":{"iso2cd":"sa","iso3cd":"SAU","name":"Saudi Arabia","versions":[10,20]},"SGP":{"iso2cd":"sg","iso3cd":"SGP","name":"Singapore","versions":[10]},"LKA":{"iso2cd":"lk","iso3cd":"LKA","name":"Sri Lanka","versions":[10,20]},"SYR":{"iso2cd":"sy","iso3cd":"SYR","name":"Syrian Arab Republic","versions":[10]},"THA":{"iso2cd":"th","iso3cd":"THA","name":"Thailand","versions":[10]},"VNM":{"iso2cd":"vn","iso3cd":"VNM","name":"Viet Nam","versions":[10,20]},"ALB":{"iso2cd":"al","iso3cd":"ALB","name":"Albania","versions":[20]},"BGR":{"iso2cd":"bg","iso3cd":"BGR","name":"Bulgaria","versions":[10]},"GEO":{"iso2cd":"ge","iso3cd":"GEO","name":"Georgia","versions":[10,20]},"MKD":{"iso2cd":"mk","iso3cd":"MKD","name":"North Macedonia, Republic of","versions":[10,20]},"ROU":{"iso2cd":"ro","iso3cd":"ROU","name":"Romania","versions":[10,20]},"SRB":{"iso2cd":"rs","iso3cd":"SRB","name":"Serbia","versions":[20]},"LVA":{"iso2cd":"lv","iso3cd":"LVA","name":"Latvia","versions":[10,20]},"MDA":{"iso2cd":"md","iso3cd":"MDA","name":"Moldova, Republic of","versions":[10]},"XKX":{"iso2cd":"xk","iso3cd":"XKX","name":"Kosovo","versions":[20]},"BLZ":{"iso2cd":"bz","iso3cd":"BLZ","name":"Belize","versions":[10]},"CUB":{"iso2cd":"cu","iso3cd":"CUB","name":"Cuba","versions":[10,20]},"DMA":{"iso2cd":"dm","iso3cd":"DMA","name":"Dominica","versions":[10,20]},"SLV":{"iso2cd":"sv","iso3cd":"SLV","name":"El Salvador","versions":[20]},"GTM":{"iso2cd":"gt","iso3cd":"GTM","name":"Guatemala","versions":[10]},"HND":{"iso2cd":"hn","iso3cd":"HND","name":"Honduras","versions":[10,20]},"MEX":{"iso2cd":"mx","iso3cd":"MEX","name":"Mexico","versions":[10]},"NIC":{"iso2cd":"ni","iso3cd":"NIC","name":"Nicaragua","versions":[10,20]},"PAN":{"iso2cd":"pa","iso3cd":"PAN","name":"Panama","versions":[10]},"LCA":{"iso2cd":"lc","iso3cd":"LCA","name":"Saint Lucia","versions":[10]},"VCT":{"iso2cd":"vc","iso3cd":"VCT","name":"Saint Vincent and the Grenadines","versions":[10,20]},"ARG":{"iso2cd":"ar","iso3cd":"ARG","name":"Argentina","versions":[10]},"BRA":{"iso2cd":"br","iso3cd":"BRA","name":"Brazil","versions":[10]},"CHL":{"iso2cd":"cl","iso3cd":"CHL","name":"Chile","versions":[10]},"COL":{"iso2cd":"co","iso3cd":"COL","name":"Colombia","versions":[10]},"URY":{"iso2cd":"uy","iso3cd":"URY","name":"Uruguay","versions":[10,20]},"NZL":{"iso2cd":"nz","iso3cd":"NZL","name":"New Zealand","versions":[10,20]},"PNG":{"iso2cd":"pg","iso3cd":"PNG","name":"Papua New Guinea","versions":[10,20]},"WSM":{"iso2cd":"ws","iso3cd":"WSM","name":"Samoa","versions":[10]},"ATA":{"iso2cd":"aq","iso3cd":"ATA","name":"Antarctica","versions":[10]}}

},{}]},{},[1]);
