import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'wavefront',
    entry: 'src/index.js',
    plugins: [babel()],
    format: 'es',
    dest: 'dist/wavefront.js'
};


