/* eslint-disable */

var path = require('path');

module.exports = {
  output: {
    library: 'VectorMarkers',
    libraryTarget: 'umd',
  },
  externals: [
    {
      leaflet: {
        amd: 'leaflet',
        commonjs: 'leaflet',
        commonjs2: 'leaflet',
        root: 'L'
      }
    }
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },
};
