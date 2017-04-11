import vnode from '../libs/vnode';

console.log(vnode);

function isPrimitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}


function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
};



// var vnode_1 = require("../../vnode");
// var is = require("../../is");

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

const assembly = (tagName) => {
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
            throw new Error('Props is not an object')
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
                if (isPrimitive(children[i]))
                    children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
            }
        }
        if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' &&
            (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
            addNS(d, children, selectorName);
        }

        return vnode_1.vnode(selectorName, d, children, text, undefined);
    }
}

export default assembly();