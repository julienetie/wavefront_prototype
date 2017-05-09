const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const precss = require('precss');
const cssvariables = require('postcss-css-variables');
const cssnano = require('cssnano');
const exec = require('child_process').exec;
const src = {
    index: 'index.html',
    style: 'style.css'
}
const gaze = require('gaze');
const srcDir = './src/';
const distDir = './dist/';
const filesToWatch = [
    './src/**/*.js',
    './src/**/*.html',
    './src/**/*.css',
    './src/**/*.json'
];


const fileTypeChanged = (fileName, type) => fileName.indexOf(`.${type}`) >= 0;

/** 
 * Build CSS.
 */
const buildCSS = (fileName) => {
    console.log('Building CSS', fileName);
    fs.readFile(`${srcDir}${src.style}`, (err, css) => {
        if (err) {
            return console.log(err);
        }
        postcss([cssvariables, precss, autoprefixer, cssnano])
            .process(css, { from: `${srcDir}${src.style}`, to: `${distDir}${src.style}`, map: { inline: false } })
            .then(result => {
                fs.writeFile(`${distDir}${src.style}`, result.css, () => {});
                if (result.map) {
                    fs.writeFile(`${distDir}${src.style}.map`, result.map);
                }
            });
    });
}


/**
 * Copy HTML.
 */
const buildHTMl = (fileName) => {
    console.log('Building HTML', fileName);
    fs.readFile(`${srcDir}${src.index}`, (err, srcFile) => {
        if (err) {
            return console.log(err);
        }
        fs.writeFile(`${distDir}${src.index}`, srcFile, () => {});
    });
}


/** 
 * Build JS.
 */
const buildJS = (fileName) => {
    console.log('Building JS', fileName);
    exec("./node_modules/rollup/bin/rollup -c", (err) => {
        if (err) {
            throw err;
        }
    });
}


/** 
 * Watch.
 */
gaze(filesToWatch, function(err, watcher) {
    console.log('***Watching for changes...')
    this.on('changed', function(filepath) {
        const splitPath = filepath.split('/');
        const fileName = splitPath[splitPath.length - 1];

        switch (fileName) {
            case src.index:
                buildHTMl(fileName);
                return;
            case src.style:
                buildCSS(fileName);
                return;
        }

        if (fileTypeChanged(fileName, 'js') || fileTypeChanged(fileName, 'json')) {
            buildJS(fileName);
        }
    });
});


/** 
 * Init.
 */
buildHTMl('');
buildCSS('');
buildJS('');
