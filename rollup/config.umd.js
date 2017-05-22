import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    moduleName: 'wavefront',
    entry: './src/index.js',
    sourceMap: true,
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
    format: 'umd',
    dest: './dist/wavefront.js'
};
