import { li, div, input, label, button } from '../../../../../dist/wavefront.es.js';

export default ({ value, toggleComplete, editing, completed, removeTodo, editTodo, saveTodo }) =>
li({ class: `${completed}${editing}`, event: editTodo },
    div({ class: 'view' },
        input({ class: 'toggle', type: 'checkbox', checked: !!completed, event: toggleComplete }),
        label(value),
        button({ class: 'destroy', event: removeTodo })
    ),
    input({ class: 'edit', value: value, event: saveTodo })
);
