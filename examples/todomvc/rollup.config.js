import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';

export default {
    moduleName: 'todoWavefront',
    entry: './src/index.js',
    sourceMap: true,
    plugins: [
        json(),
        babel({
            babelrc: false,
            presets: 'es2015-rollup'
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonJS({
            namedExports: {
                'node_modules/baobab/dist/baobab.js': ['Baobab'],
                'Emmett': ['Emmett']
            }
        }),
        sourcemaps(),
        uglify()
    ],
    format: 'umd',
    dest: './public/scripts/app.js'
}
