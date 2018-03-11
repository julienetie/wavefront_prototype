import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: './src/index.js',
    plugins: [babel({
            babelrc: false,
            presets: ["es2015-rollup"]
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        cjs({
            include: 'node_modules/**',
            exclude: []
        }),
        sourcemaps(),
    ],
    output: {
        sourcemap: true,
        name: 'wavefront',
        format: 'umd',
        file: './dist/wavefront.js'
    }
};