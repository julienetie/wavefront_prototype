import {
    div,
    section,
    a,
    ul,
    li,
    svg,
    defs,
    linearGradient,
    Stop,
    h1,
    h2,
    ellipse,
    span,
    tr,
    tbody,
    td
} from './tags';
import { renderPartial } from './assembly';
import { loop, or } from './logic';


const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';
const isFunction = value => typeof value === 'function';
const isElement = value => value instanceof Element;




//////////////////
// test.
var startTime;
var lastMeasure;
var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function() {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
}

function _random(max) {
    return Math.round(Math.random() * 1000) % max;
}

const buildData = (count = 1000) => {
    let id = 0;
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i = 0; i < count; i++)
        data.push({ id, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    return data;
}

let thing = [];
const lotsData = buildData(10000);
console.log('lotsData',lotsData)
const table = dat => tr({ class: 'menu-item' }, [
    td({ class: 'col-md-1' },
        dat.id
    ),
    td({ class: 'col-md-4' },
        a({ class: 'lbl' }, dat.label)
    ),
    td({ class: 'col-md-1' },
        a({ class: 'remove' },
            span({
                class: 'glyphicon glyphicon-remove remove'
            })
        )
    ),
    td({ class: 'col-md-6' })
])

const buildTable = data => {
    const arrayOfChildren = [];
    for (let i = 0; i < data.length; i++) {
        arrayOfChildren.push(table(data[i]));
    }
    console.log('arrayOfChildren', arrayOfChildren)
    return arrayOfChildren;
}

//////////////////




const twitterHref = 'http://google.com';
const facebookHref = 'http://facebook.com';
const someUI = div({ class: 'wrapper' },
    div({ id: 'block-social-responsive', class: 'footer__social' },
        ul({ class: 'menu' },
            li({ class: 'menu-item' },
                a({ href: twitterHref, class: 'icon-twitter', target: '_blank' },
                    'TWITTER'
                )
            ),
            li({ class: 'menu-item' },
                a({
                        href: facebookHref,
                        class: 'icon-fb',
                        target: '_blank',
                        _innerHTML: 'HELOOOOOOO',
                        // event: ['mouseover', (e) => { console.log('THIS ELEMENT', e.target) }, false],
                        $: { backgroundColor: 'red', color: 'yellow' },
                        'd-foijfwoeifjw': 2000000000,
                        name: 'jack'
                    },
                    'FACEBOOK'
                )
            ),
            or([
                div({ class: 'hello', id: 'yeaa' }, 'HELLO'),
                div({ class: 'foo' }, 'FOO'),
                a({ class: 'bar', id: 'yeaa' },
                    h1('This is H TAG 1'),
                    h2('This is H TAG 2'),
                    'BAR'
                ),
                div({ class: 'baz' }, 'BAZ'),
                section({ class: 'hello' },
                    h1('This is H TAG 1'),
                    h2('This is H TAG 2'),
                ),
                section({ class: 'world' }, 'WORLD'),
            ], ['~2', '.world'], true),
            // Without variables...
            li({ class: 'menu-item' },
                a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' },
                    'Linkedin'
                ),
                `@This is a single line comment`
            ),
            loop(li({ style: { backgroundColor: 'pink', fontSize: 20 } }, 'HELLO WORLD'), 5),
            loop(buildTable, lotsData),
        )
    ),
    section({ id: 'blah', class: 'wefw' }, 'TEST SECTION'),
    svg({ height: 150, width: 400 },
        defs(
            linearGradient({ id: 'grad1', x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
                Stop({ offset: '0%', style: { 'stop-color': 'rgb(255,0,0)', 'stop-opacity': 1 } }),
                Stop({ offset: '100%', style: { 'stop-color': 'rgb(255,255,0)', 'stop-opacity': 1 } })
            )
        ),
        ellipse({ cx: 200, cy: 70, rx: 85, ry: 55, fill: 'url(#grad1)' }),
        'Sorry, your browser does not support inline SVG.'
    ),
    `@This comment is outside`,
)


document.addEventListener('click', () => {
    startMeasure('Wavefront')
    const render = renderPartial('#root');
    render(someUI);
    stopMeasure();
}, false);