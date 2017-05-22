import headings from './headings/controller';
import footer from './footer/controller';
import display from './display/controller';
import keypad from './keypad/controller';
import render from '../render';
import { div } from '../../../../../dist/wavefront.es.js';

let oldVnode;
let newVnode
const calculatorApp = document.getElementById('root');


// var vnode = div({ id: 'container', class: 'two classes', event: { click: () => { console.log('yo') } } }, [
//     span({ style: { fontWeight: 'bold' } }, 'This is bold'),
//     ' and this is just normal text',
//     a({ props: { href: '/foo' } }, 'I\'ll take you places!')
// ]);
let displayContent;
let clearButton = 'CE';
const ui = (cmd, data) => {

    switch (cmd) {
        case 'PRINT_CHARS':
            displayContent = data;
            break;
        case 'CHANGE_CE_TO_AC':
            clearButton = 'AC';
            break;
        case 'CHANGE_AC_TO_CE':
            clearButton = 'CE';
            break;
    }



    newVnode = div({ class: 'plane' }, [
        ...headings(),
        div({ class: 'calculator' }, [
            display(displayContent),
            keypad(clearButton),
        ]),
        footer(),
    ]);

    render(
        calculatorApp,
        newVnode,
        oldVnode,
    );

    oldVnode = newVnode;
    return;
}

export default ui;
