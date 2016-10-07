import { renderHasInterface, once } from './utils';
import { renderBranches } from './render-branches';
import { wave } from './core';
export const render = {};

const Render = {
  method1() {
    this.tree = 'green';
  },
  method2() {
    // console.log('i am ' + this.tree);
  },
  // renderUpdates(selector, interfaceName, interfaceType) {
  //   // console.info('New updates Rendered')
  //   // let currentVirtualTree = wave.dynamicStore[interfaceName].currentVirtualTree();
  //   // let updatedTree = renderVariables(currentVirtualTree, selector, interfaceName);
  //   // renderVariables.prototype.count = false;

  //   // console.log(updatedTree);
  // },
  initialRender(selector, interfaceName) {
    // console.info('New interface Rendered')
    const currentVirtualTree = wave.dynamicStore[interfaceName].currentVirtualTree();
    renderBranches(currentVirtualTree, selector, interfaceName);
  },
}

render.static = Object.create(Render);
render.stateless = Object.create(Render);
render.dynamic = Object.create(Render);

export function addInterfaceRenderMethod(interfaceName, interfaceType) {
  const fnName = 'addInterfaceRenderMethod';
  let intitialRender;

  if (!renderHasInterface(interfaceName, interfaceType)){
    render[interfaceType][interfaceName] = function(selector) {
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
    // console.info('new interface Added')
  }
}
