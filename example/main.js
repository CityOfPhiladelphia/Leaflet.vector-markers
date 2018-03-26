import { Map, TileLayer, Marker } from 'leaflet';
import VectorIcon from '../dist/leaflet-vector-icon';

// styles
import 'leaflet/dist/leaflet.css';
import 'font-awesome/css/font-awesome.min.css';
import '../dist/leaflet-vector-icon.css';

const map = new Map('map').setView([48.15491,11.54183], 14);

new TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  detectRetina: true,
}).addTo(map);

new Marker([48.15491,11.54183], {
  icon: new VectorIcon({
    icon: 'spinner',
    prefix: 'fa',
    markerColor: '#cb4b16',
    spin: true,
  })
}).addTo(map);
