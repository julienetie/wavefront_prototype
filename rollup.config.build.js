import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'plow',
    entry: 'src/wavefront.js',
    plugins: [babel()],
    format: 'umd',
    dest: 'dist/index.js'
};
