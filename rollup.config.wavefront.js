import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
    moduleName: 'wavefront',
    entry: 'src/index.js',
    plugins: [babel(),
    eslint({
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
})
    ],
    format: 'es',
    dest: 'dist/wavefront.js'
};


