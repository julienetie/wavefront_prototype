import { footer, span, strong, ul, li, a, button } from '../../../../../dist/wavefront.es.js';
/** 
 * Footer.
 * @param ...
 */
export default ({ itemsLeft, all, active, completed }) =>
footer({ class: 'footer' },
    span({ class: 'todo-count', style: { background: 'blue' } },
        strong(itemsLeft), ' items left'),
    ul({ class: 'filters' },
        li(a({ class: 'selected', href: '#/', event: all }, 'All')),
        li(a({ href: '#/active', event: active }, 'Active')),
        li(a({ href: '#/completed', event: completed }, 'Completed'))
    ),
    button({ class: 'clear-completed' }, 'Clear completed')
);


// style 
// href
