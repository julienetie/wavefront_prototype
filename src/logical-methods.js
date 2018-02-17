import { isPlaneObject, filter} from './helpers';

/** 
 * The or method explicitly defines a condition between an array of nodes. 
 * @param {Array} vNodes - An array of vNodes 
 * @param {Number|Array} switch - A number or series of inidcators (as an array) of what elements to display.
 * @exclude {Boolean} exclude - 
 * 
 */
export const or = (vNodes, conditions, exclude) => {
    const filteredVNodes = [];
    const filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }


    // Ensure toggle is an array. 
    const toggle = typeof conditions === 'string' ? [conditions] : conditions;


    // Non-operational.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    // Define conditions required.
    const classes = filter(toggle, e => e.indexOf('.') > -1);
    const classesLength = classes.length
    const ids = filter(toggle, e => e.indexOf('#') === 0);
    const tags = filter(toggle, e => /^[a-z0-9]+$/i.test(e));
    const children = filter(toggle, e => e.indexOf('~') === 0);
    const indexes = filter(toggle, e => typeof e === 'number');
    const vNodesLength = vNodes.length;

    for (let i = 0; i < vNodesLength; i++) {
        const vNode = vNodes[i];
        const attributes = vNode.at;

        // Check class.
        if (classesLength > 0) {
              for (let j = 0; j < classesLength; j++) {
                  if (attributes.class.includes(classes[j].slice(1))) {
                    filteredIndexes.push(i);
                }
              }
        }

        // Check ids.
        if (ids.length > 0) {
            ids.forEach(c => {
                if (attributes.id === c.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }


        // Check tags.
        if (tags.length > 0) {
            tags.forEach(c => {
                if (vNode.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }


        // Check children.
        if (children.length > 0) {
            children.forEach(x => {
                const childrenLength = vNode.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length;
                if (childrenLength == x.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }
    }


    // Remove duplicate indexes.
    const indexList = [...(new Set(filteredIndexes))];

    if (exclude === true) {
        return filter(vNodes, (item, i) => indexList.indexOf(i) === -1);
    } else {
        indexList.forEach(index => {
            filteredVNodes.push(vNodes[index]);
        });
        return filteredVNodes;
    }
}



/** 
 * or is used when you explicitly want the to inidicate
 * that an item is being looped by n times or via data
 * 
 * @param {Object|Array} vNodes 
 * @param {*} Data 
 */
export const loop = (vNodes, data) => {
    const groupVnodes = Array.isArray(vNodes);
    const hasNumber = typeof data === 'number';

    if (hasNumber) {
        const loopedVnodes = [];
        const singleVnode = isPlaneObject(vNodes);

        // Single vnode looped by an integer.
        if (singleVnode) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(vNodes);
            }
        }

        // Grouped vnode looped by an integer.
        if (groupVnodes) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(...vNodes);
            }
        }
        return loopedVnodes;
    } else {
        if (typeof vNodes === 'function') {
            return vNodes(data)

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }
}