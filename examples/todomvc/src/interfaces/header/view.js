import h from 'snabbdom/h';

const header = ({ returnKey }) => {
    return h('header.header', [
        h('h1', ['todos']),
        h('input.new-todo', {
            props: { placeholder: 'What needs to be done?', autofocus: 'autofocus' },
            on: returnKey
        })
    ]);
}

export default header;
