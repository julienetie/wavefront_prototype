import { initialize, assembly } from './assembly';
import { loop, or } from './logical-methods';

// HTML Elements.
const tags = ({
    a: assembly('a'),
    abbr: assembly('abbr'),
    address: assembly('address'),
    area: assembly('area'),
    article: assembly('article'),
    aside: assembly('aside'),
    assembly,
    audio: assembly('audio'),
    childNodes: assembly('childNodes'),
    base: assembly('base'),
    bdi: assembly('bdi'),
    bdo: assembly('bdo'),
    blockquote: assembly('blockquote'),
    body: assembly('body'),
    br: assembly('br'),
    button: assembly('button'),
    canvas: assembly('canvas'),
    caption: assembly('caption'),
    cite: assembly('cite'),
    code: assembly('code'),
    col: assembly('col'),
    colgroup: assembly('colgroup'),
    command: assembly('command'),
    dd: assembly('dd'),
    del: assembly('del'),
    dfn: assembly('dfn'),
    div: assembly('div'),
    dl: assembly('dl'),
    doctype: assembly('doctype'),
    dt: assembly('dt'),
    em: assembly('em'),
    embed: assembly('embed'),
    fieldset: assembly('fieldset'),
    figcaption: assembly('figcaption'),
    figure: assembly('figure'),
    footer: assembly('footer'),
    form: assembly('form'),
    h1: assembly('h1'),
    h2: assembly('h2'),
    h3: assembly('h3'),
    h4: assembly('h4'),
    h5: assembly('h5'),
    h6: assembly('h6'),
    header: assembly('header'),
    hgroup: assembly('hgroup'),
    hr: assembly('hr'),
    html: assembly('html'),
    i: assembly('i'),
    iframe: assembly('iframe'),
    img: assembly('img'),
    initialize,
    input: assembly('input'),
    ins: assembly('ins'),
    kbd: assembly('kbd'),
    keygen: assembly('keygen'),
    label: assembly('label'),
    legend: assembly('legend'),
    li: assembly('li'),
    link: assembly('link'),
    loop,
    map: assembly('map'),
    mark: assembly('mark'),
    menu: assembly('menu'),
    meta: assembly('meta'),
    nav: assembly('nav'),
    noscript: assembly('noscript'),
    object: assembly('object'),
    ol: assembly('ol'),
    optgroup: assembly('optgroup'),
    option: assembly('option'),
    or,
    p: assembly('p'),
    param: assembly('param'),
    pre: assembly('pre'),
    progress: assembly('progress'),
    q: assembly('q'),
    rp: assembly('rp'),
    rt: assembly('rt'),
    ruby: assembly('ruby'),
    s: assembly('s'),
    samp: assembly('samp'),
    script: assembly('script'),
    section: assembly('section'),
    select: assembly('select'),
    small: assembly('small'),
    source: assembly('source'),
    span: assembly('span'),
    strong: assembly('strong'),
    style: assembly('style'),
    sub: assembly('sub'),
    sup: assembly('sup'),
    table: assembly('table'),
    tbody: assembly('tbody'),
    td: assembly('td'),
    textarea: assembly('textarea'),
    tfoot: assembly('tfoot'),
    th: assembly('th'),
    thead: assembly('thead'),
    title: assembly('title'),
    tr: assembly('tr'),
    ul: assembly('ul'),
    Var: assembly('var'), // First capital
    video: assembly('video'),

    // SVG Elements.
    svg: assembly('svg', true),
    altGlyph: assembly('altGlyph', true),
    altGlyphDef: assembly('altGlyphDef', true),
    altGlyphItem: assembly('altGlyphItem', true),
    animate: assembly('animate'),
    animateColor: assembly('animateColor', true),
    animateMotion: assembly('animateMotion', true),
    animateTransform: assembly('animateTransform', true),
    animation: assembly('animation', true),
    circle: assembly('circle', true),
    clipPath: assembly('clipPath', true),
    colorProfile: assembly('color-profile', true), // color-profile
    cursor: assembly('cursor', true),
    defs: assembly('defs', true),
    desc: assembly('desc', true),
    discard: assembly('discard', true),
    ellipse: assembly('ellipse', true),
    feBlend: assembly('feBlend', true),
    feColorMatrix: assembly('feComposite', true),
    feComponentTransfer: assembly('feComponentTransfer', true),
    feComposite: assembly('feComposite', true),
    feConvolveMatrix: assembly('feConvolveMatrix', true),
    feDiffuseLighting: assembly('feDiffuseLighting', true),
    feDisplacementMap: assembly('feDistantLight', true),
    feDistantLight: assembly('feDistantLight', true),
    feDropShadow: assembly('feDropShadow', true),
    feFlood: assembly('feFlood', true),
    feFuncA: assembly('feFuncA', true),
    feFuncB: assembly('feFuncB', true),
    feFuncG: assembly('feFuncG', true),
    feFuncR: assembly('feFuncR', true),
    feGaussianBlur: assembly('feGaussianBlur', true),
    feImage: assembly('feImage', true),
    feMerge: assembly('feMerge', true),
    feMergeNode: assembly('feMergeNode', true),
    feMorphology: assembly('feMorphology', true),
    feOffset: assembly('feOffset', true),
    fePointLight: assembly('fePointLight', true),
    feSpecularLighting: assembly('feSpecularLighting', true),
    feSpotLight: assembly('feSpotLight', true),
    feTile: assembly('feTile', true),
    feTurbulence: assembly('feTurbulence', true),
    filter: assembly('filter', true),
    font: assembly('font', true),
    fontFace: assembly('font-face', true), // fontFace
    fontFaceFormat: assembly('font-face-format', true), // fontFaceFormat
    fontFaceName: assembly('font-face-name', true), // fontFaceName
    fontFaceSrc: assembly('font-face-src', true), // fontFaceSrc
    fontFaceUri: assembly('font-face-uri', true), // fontFaceUri
    foreignObject: assembly('foreignObject', true),
    g: assembly('g', true),
    glyph: assembly('glyph', true),
    glyphRef: assembly('glyphRef', true),
    handler: assembly('handler', true),
    hatch: assembly('hatch', true),
    hatchpath: assembly('hatchpath', true),
    hkern: assembly('hkern', true),
    image: assembly('image', true),
    line: assembly('line', true),
    linearGradient: assembly('linearGradient', true),
    listener: assembly('listener'),
    marker: assembly('marker', true),
    mask: assembly('mask', true),
    mesh: assembly('mesh', true),
    meshgradient: assembly('meshgradient', true),
    meshpatch: assembly('meshpatch', true),
    meshrow: assembly('meshrow', true),
    metadata: assembly('metadata', true),
    missingGlyph: assembly('missing-glyph', true), // missing-glyph
    mpath: assembly('mpath', true),
    path: assembly('path', true),
    pattern: assembly('pattern', true),
    polygon: assembly('polygon', true),
    polyline: assembly('polyline', true),
    prefetch: assembly('prefetch', true),
    radialGradient: assembly('radialGradient', true),
    rect: assembly('rect', true),
    set: assembly('set', true),
    solidColor: assembly('solidColor', true),
    solidcolor: assembly('solidcolor', true),
    Stop: assembly('stop', true), // First capital
    Switch: assembly('switch', true), // First capital
    symbol: assembly('symbol', true),
    tbreak: assembly('tbreak', true),
    text: assembly('text', true),
    textArea: assembly('textArea', true),
    textPath: assembly('textPath', true),
    tref: assembly('tref', true),
    tspan: assembly('tspan', true),
    unknown: assembly('unknown', true),
    use: assembly('use', true),
    view: assembly('view', true),
    vkern: assembly('vkern', true)
})

export default tags;