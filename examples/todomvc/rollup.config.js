import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
export default {
    moduleName: 'todoWavefront',
    entry: './src/index.js',
    plugins: [
        babel({
            babelrc: false,
            presets: 'es2015-rollup'
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonJS()
    ],
    format: 'umd',
    dest: './public/scripts/app.js'
}
