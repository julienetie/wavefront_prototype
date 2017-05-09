import { init } from 'snabbdom';
import { classModule } from 'snabbdom/modules/class';
import { heroModule } from 'snabbdom/modules/hero';
import { styleModule } from 'snabbdom/modules/style';
import eventListenersModule from '../../../../libs/eventlisteners';

const patch = init([
    classModule,
    heroModule,
    styleModule,
    eventListenersModule
]);


const render = (container, vNode, oldVnode) => {
    if (!oldVnode) {
        patch(container, vNode);
    }
    if (oldVnode && oldVnode !== vNode) {
        patch(oldVnode, vNode);
    }
}

export default render;