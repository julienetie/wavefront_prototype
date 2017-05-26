import { li, div, input, label, button } from '../../../../../../dist/wavefront.es.js';

export default ({
    value,
    toggleComplete,
    editing,
    edit,
    completed,
    removeTodo,
    editTodo,
    saveTodo,
    editInput,
    focusOnInput
}) =>
li({
        class: `${completed} ${editing}`,
        event: editTodo
    },
    div({ class: 'view' },
        input({ class: 'toggle', type: 'checkbox', checked: !!completed, event: toggleComplete }),
        label(value),
        button({ class: 'destroy', event: removeTodo })
    ),
    editInput(value, saveTodo, focusOnInput)
);
