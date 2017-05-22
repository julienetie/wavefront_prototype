import h from 'snabbdom/h';

const footer = ({ itemsLeft, all, active, completed }) => {
    return h('footer.footer', [
        h('span.todo-count', [
            h('strong', itemsLeft),
            ' items left'
        ]),
        h('ul.filters', [
            h('li', [
                h('a.selected', { props: { href: '#/' }, on: all }, ['All']),
            ]),
            h('li', [
                h('a', { props: { href: '#/active' }, on: active }, ['Active']),
            ]),
            h('li', [
                h('a', { props: { href: '#/completed' }, on: completed }, ['Completed']),
            ])
        ]),
        h('button.clear-completed', ['Clear completed'])
    ]);
}

export default footer;
