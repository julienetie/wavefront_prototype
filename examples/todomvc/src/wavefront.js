import { patch } from '../../../dist/wavefront.es';

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