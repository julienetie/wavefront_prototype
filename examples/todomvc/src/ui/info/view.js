import h from 'snabbdom/h';

const info = () => {
    return h('footer.info', [
        h('p', ['Double-click to edit a todo']),
        h('p', ['Created by ', h('a', { param: { href: 'https://github.com/julienetie' } }, ['Julien Etienne'])]),
        h('p', ['Part of', h('a', { param: { href: 'http://todomvc.com' } })])
    ]);
}

export default info;
