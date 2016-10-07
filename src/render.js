import { renderHasInterface, once } from './utils';
import { renderBranches } from './render-branches';
import { renderVariables } from './render-variables';
let _render = {};

const Render = {
    method1: function() {
        this.tree = 'green';
    },
    method2: function() {
        console.log('i am ' + this.tree);
    },
    renderUpdates(selector, interfaceName, interfaceType) {
        // console.info('New updates Rendered')
        // let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
        // let updatedTree = renderVariables(currentVirtualTree, selector, interfaceName);
        // renderVariables.prototype.count = false;

        // console.log(updatedTree);
    },
    initialRender(selector, interfaceName, interfaceType) {
        console.info('New interface Rendered')
        let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
        renderBranches(currentVirtualTree, selector, interfaceName);
    }
}


_render.static = Object.create(Render);
_render.stateless = Object.create(Render);
_render.dynamic = Object.create(Render);

export function addInterfaceRenderMethod(interfaceName, interfaceType) {
    const fnName = 'addInterfaceRenderMethod';
    let intitialRender;
    if (!renderHasInterface(interfaceName, interfaceType)) {
        _render[interfaceType][interfaceName] = function(selector) {
            intitialRender = once(fnName + interfaceName);
            switch (interfaceType) {
                case 'dynamic':
                    if (intitialRender) {
                        this.initialRender(selector, interfaceName, interfaceType);
                    } else {
                        this.renderUpdates(selector, interfaceName, interfaceType);
                    }
                    break;
                case 'stateless':
                    if (intitialRender) {
                        this.initialRender(selector, interfaceName, interfaceType);
                    }
                    break;
                case 'static':
                    if (intitialRender) {
                        this.initialRender(selector, interfaceName, interfaceType);
                    } else {
                        this.renderUpdates(selector, interfaceName, interfaceType);
                    }
                    break;
            }
        }
        console.info('new interface Added')
        window.d = __._dynamicStore;
    }
}

export let render = _render;
