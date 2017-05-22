import h from 'snabbdom/h';

const todoItem = ({ value, toggleComplete, editing, completed, removeTodo, editTodo, saveTodo }) => {
    return h(`li${completed}${editing}`, { on: editTodo }, [
        h('div.view', [
            h('input.toggle', { props: { type: 'checkbox', checked: !!completed }, on: toggleComplete }),
            h('label', value),
            h('button.destroy', { on: removeTodo })
        ]),
        h('input.edit', { props: { value: value }, on: saveTodo })
    ]);
}

export default todoItem;
