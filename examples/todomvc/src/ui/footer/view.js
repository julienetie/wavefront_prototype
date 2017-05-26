import { footer, span, strong, ul, li, a, button } from '../../../../../dist/wavefront.es';
/**
 * Footer.
 * @param ...
 */
export default ({
    itemsLeft,
    all,
    active,
    completed,
    clearComplete,
    clearCompletedButton,
    viewState,
}) => footer({ class: 'footer' },
    span({ class: 'todo-count' },
        strong(itemsLeft), ' items left'),
    ul({ class: 'filters' },
        li(a({ class: viewState.all, href: '#/', event: all }, 'All')),
        li(a({ class: viewState.active, href: '#/active', event: active }, 'Active')),
        li(a({ class: viewState.completed, href: '#/completed', event: completed }, 'Completed')),
    ),
    button({
        class: 'clear-completed',
        event: clearComplete,
        style: { display: clearCompletedButton },
    }, 'Clear completed'),
);
