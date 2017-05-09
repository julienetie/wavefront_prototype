import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';

export default {
    moduleName: 'calculatorApp',
    entry: './src/js/index.js',
    sourceMap: true,
    plugins: [
        json(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        cjs({
            include: 'node_modules/**',
            exclude: []
        }),
        babel({
            babelrc: false,
            presets: 'es2015-rollup'
        }),
        sourcemaps(),
        uglify()
    ],
    format: 'iife',
    dest: './dist/script.js'
}
