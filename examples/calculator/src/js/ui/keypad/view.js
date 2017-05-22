import { div, span, sup } from '../../../../../../dist/wavefront.es.js';

const keypad = (clearButton) =>
    div({ class: 'keypad' }, [
        div({ class: 'key-row-1 keys', }, [
            span({ class: 'clear' }, clearButton),
            span({ class: 'sqrt' }, '√'),
            span({ class: 'pow' }, [
                'x',
                sup({}, 'y'),
            ]),
            span({ class: 'sqrt' }, '|x|'),
            span({ class: 'sqrt' }, 'log'),
            span({ class: 'operator' }, ')'),
        ]),
        div({ class: 'key-row-1 keys' }, [
            span({ class: 'sin' }, '%'),
            span({ class: 'sin' }, 'sin'),
            span({ class: 'sin' }, 'cos'),
            span({ class: 'sin' }, 'tan'),
            span({ class: 'sin' }, 'π'),
            span({ class: 'comma' }, '('),
        ]),
        div({ class: 'key-row-2 keys' }, [
            span({ class: 'quad' }, '7'),
            span({ class: 'quad' }, '8'),
            span({ class: 'quad' }, '9'),
            span({ class: 'quad-last' }, '÷'),
            span({ class: 'quad' }, '4'),
            span({ class: 'quad' }, '5'),
            span({ class: 'quad' }, '6'),
            span({ class: 'quad-last' }, '×'),
            span({ class: 'quad' }, '1'),
            span({ class: 'quad' }, '2'),
            span({ class: 'quad' }, '3'),
            span({ class: 'quad-last' }, '−'),
            span({ class: 'quad' }, '0'),
            span({ class: 'quad' }, '.'),
            span({ class: 'quad' }, '='),
            span({ class: 'quad-last' }, '+'),
        ])
    ]);

export default keypad;
