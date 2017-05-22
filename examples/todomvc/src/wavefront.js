import snabbdom from 'snabbdom';
import sClass from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import eventlisteners from '../libs/snabbdom_eventlisteners';

// Render 

var patch = snabbdom.init([
    sClass,
    props,
    style,
    eventlisteners
]);

const render = (container, vNode, oldVnode) => {
    if (!oldVnode) {
        patch(container, vNode);
    }
    if (oldVnode && oldVnode !== vNode) {
        patch(oldVnode, vNode);
    }
}

// Data Skeleton

function o(address, write) {
    const addressArr = address.split(' ');
    const addressLength = addressArr.length;
    let path = o.prototype.skeleton;

    for (let i = 0; i < addressLength; i++) {
        path = path[addressArr[i]];

        if (write) {
            if (i === addressLength - 2) {
                path[addressArr[i + 1]] = write;
            }
        }
    }

    return path;
}

o.create = function(skeleton) {
    o.prototype.skeleton = skeleton;
};

 export {
  render, 
  o
 };