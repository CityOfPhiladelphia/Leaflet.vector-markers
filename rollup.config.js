import html from 'rollup-plugin-html';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const dev = !!process.env.ROLLUP_WATCH;

const globals = {
  leaflet: 'L',
};
const external = Object.keys(globals);
const { name } = pkg;

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}.js`,
    format: 'umd',
    // TODO can this patch L?
    name: 'leafletVectorIcon',
    globals,
    sourcemap: true,
  },
  external,
  plugins: [
    html(),
    buble(),
    !dev && uglify(),
    copy({
      'src/styles.css': `dist/${name}.css`,
      verbose: true,
    }),
  ],
};
