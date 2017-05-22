import { footer, span, strong, ul, li, a, button } from '../../../../../dist/wavefront.es.js';
/** 
 * Footer.
 * @param ...
 */
export default ({ itemsLeft, all, active, completed }) =>
footer({ class: 'footer' },
    span({ class: 'todo-count' },
        strong(itemsLeft),
        ' items left'
    ),
    ul({ class: 'filters' },
        li(a({ class: 'selected', props: { href: '#/' }, on: all }, 'All')),
        li(a({ props: { href: '#/active' }, on: active }, 'Active')),
        li(a({ props: { href: '#/completed' }, on: completed }, 'Completed'))
    ),
    button({ class: 'clear-completed' }, 'Clear completed')
);
