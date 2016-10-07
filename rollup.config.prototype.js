import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'app',
    entry: 'src/app.js',
    plugins: [babel()],
    format: 'umd',
    dest: 'dist/app.js'
};


