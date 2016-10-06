import { renderHasInterface, once } from './utils';
let _render = {};

const Render = {
    method1: function() {
        this.tree = 'green';
    },
    method2: function() {
        console.log('i am ' + this.tree);
    },
    render(selector, interfaceName, interfaceType) {
        console.info('new interface Rendered')
        let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
        __._createNewInterface(currentVirtualTree, selector, interfaceName);
    },
    renderOnce(selector, interfaceName, interfaceType) {
        if (once('renderOnce')) {
            console.info('new interface Rendered Once')
            let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
            __._createNewInterface(currentVirtualTree, selector, interfaceName);
        }
    }
}


_render.static = Object.create(Render);
_render.stateless = Object.create(Render);
_render.dynamic = Object.create(Render);

export function addInterfaceRenderMethod(interfaceName, interfaceType) {
    if (!renderHasInterface(interfaceName, interfaceType)) {
        _render[interfaceType][interfaceName] = function(selector) {
            switch (interfaceType) {
                case 'dynamic':
                    this.render(selector, interfaceName, interfaceType);
                    break;
                case 'stateless':
                    this.renderOnce(selector, interfaceName, interfaceType);
                    break;
                case 'static':
                    this.render(selector, interfaceName, interfaceType);
                    break;
            }
        }
        console.info('new interface Added')
    }
}

export let render = _render;
