function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}

function isPrimitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}

function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}

const assembly = tagName => {
    return function inner(props, b) {
        let sel = `${tagName}`;
        let selectorName = tagName;
        let d = {};

        if (isObject(props)) {
            if (props.hasOwnProperty('id')) {
                selectorName += '#' + props.id;
            }
            if (props.hasOwnProperty('class') || props.hasOwnProperty('_')) {
                selectorName += '.' + props.class;
            }

            for (let prop in props) {
                if (prop !== 'class' && prop !== 'id' && prop !== '_') {
                    if (prop === 'event') {
                        d.on = props.event;
                    } else {
                        d[prop] = props[prop];
                    }
                }
            }
        } else {
            throw new Error('Props is not an object');
        }

        var children, text, i;
        if (b !== undefined) {
            if (Array.isArray(b)) {
                children = b;
            } else if (isPrimitive(b)) {
                text = b;
            } else if (b && b.sel) {
                children = [b];
            }
        }

        if (Array.isArray(children)) {
            for (i = 0; i < children.length; ++i) {
                if (isPrimitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i]);
            }
        }
        if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' && (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
            addNS(d, children, selectorName);
        }

        return vnode(selectorName, d, children, text, undefined);
    };
};

const a = assembly('a');
const abbr = assembly('abbr');
const address = assembly('address');
const area = assembly('area');
const article = assembly('article');
const aside = assembly('aside');
const audio = assembly('audio');
const b = assembly('b');
const base = assembly('base');
const bdi = assembly('bdi');
const bdo = assembly('bdo');
const blockquote = assembly('blockquote');
const body = assembly('body');
const br = assembly('br');
const button = assembly('button');
const canvas = assembly('canvas');
const caption = assembly('caption');
const cite = assembly('cite');
const code = assembly('code');
const col = assembly('col');
const colgroup = assembly('colgroup');
const command = assembly('command');
const dd = assembly('dd');
const del = assembly('del');
const dfn = assembly('dfn');
const div = assembly('DIV');
const dl = assembly('dl');
const doctype = assembly('doctype');
const dt = assembly('dt');
const em = assembly('em');
const embed = assembly('embed');
const fieldset = assembly('fieldset');
const figcaption = assembly('figcaption');
const figure = assembly('figure');
const footer = assembly('footer');
const form = assembly('form');
const h1 = assembly('h1');
const h2 = assembly('h2');
const h3 = assembly('h3');
const h4 = assembly('h4');
const h5 = assembly('h5');
const h6 = assembly('h6');
const header = assembly('header');
const hgroup = assembly('hgroup');
const hr = assembly('hr');
const html = assembly('html');
const i = assembly('i');
const iframe = assembly('iframe');
const img = assembly('img');
const input = assembly('input');
const ins = assembly('ins');
const kbd = assembly('kbd');
const keygen = assembly('keygen');
const label = assembly('label');
const legend = assembly('legend');
const li = assembly('li');
const link = assembly('link');
const map = assembly('map');
const mark = assembly('mark');
const menu = assembly('menu');
const meta = assembly('meta');
const nav = assembly('nav');
const noscript = assembly('noscript');
const object = assembly('object');
const ol = assembly('ol');
const optgroup = assembly('optgroup');
const option = assembly('option');
const p = assembly('p');
const param = assembly('param');
const pre = assembly('pre');
const progress = assembly('progress');
const q = assembly('q');
const rp = assembly('rp');
const rt = assembly('rt');
const ruby = assembly('ruby');
const s = assembly('s');
const samp = assembly('samp');
const script = assembly('script');
const section = assembly('section');
const select = assembly('select');
const small = assembly('small');
const source = assembly('source');
const span = assembly('span');
const strong = assembly('strong');
const style = assembly('style');
const sub = assembly('sub');
const sup = assembly('sup');
const table = assembly('table');
const tbody = assembly('tbody');
const td = assembly('td');
const textarea = assembly('textarea');
const tfoot = assembly('tfoot');
const th = assembly('th');
const thead = assembly('thead');
const title = assembly('title');
const tr = assembly('tr');
const ul = assembly('ul');
const v = assembly('var');
const video = assembly('video');

export { a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote, body, br, button, canvas, caption, cite, code, col, colgroup, command, dd, del, dfn, div, dl, doctype, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, html, i, iframe, img, input, ins, kbd, keygen, label, legend, li, link, map, mark, menu, meta, nav, noscript, object, ol, optgroup, option, p, param, pre, progress, q, rp, rt, ruby, s, samp, script, section, select, small, source, span, strong, style, sub, sup, table, tbody, td, textarea, tfoot, th, thead, title, tr, ul, v, video };
