import mimetic from 'mimetic';

// For Scalable Web Design: 
mimetic(); 

// import { init } from 'snabbdom';
// import { classModule } from 'snabbdom/modules/class';
// import { heroModule } from 'snabbdom/modules/hero';
// import { styleModule } from 'snabbdom/modules/style';
// import eventListenersModule from '../libs/eventlisteners';
// import { a, h1, h2, div, span } from '../dist/hypertext.es.js';

// const patch = init([
//     classModule,
//     heroModule,
//     styleModule,
//     eventListenersModule
// ]);


// window.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('container');

//     var vnode = div({ id: 'container', class: 'two classes', event: { click: () => { console.log('yo') } } }, [
//         span({ style: { fontWeight: 'bold' } }, 'This is bold'),
//         ' and this is just normal text',
//         a({ props: { href: '/foo' } }, 'I\'ll take you places!')
//     ]);
//     // Patch into empty DOM element – this modifies the DOM as a side effect
//     patch(container, vnode);

//     var newVnode = div({ id: 'container', class: '.two.classes', event: { click: () => { console.log('yo') } } }, [
//         span({ style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
//         ' and this is still just normal text',
//         a({ props: { href: '/bar' } }, 'I\'ll take you places!')
//     ]);
//     // Second `patch` invocation
//     patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state

// });
