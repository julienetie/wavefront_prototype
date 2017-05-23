import headings from './headings/controller';
import footer from './footer/controller';
import display from './display/controller';
import keypad from './keypad/controller';
import { div, render } from '../../../../../dist/wavefront.es';

let oldVnode;
let newVnode
const calculatorApp = document.getElementById('root');

console.log('this is render',render)

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
        newVnode
        // oldVnode,
    );

    // oldVnode = newVnode;
    return;
}

export default ui;
