import { section, input, label, ul } from '../../../../../dist/wavefront.es.js';

export default ({ todoList, toggleAllAsCompleted }) =>
section({ class: 'main' },
    input({ class: 'toggle-all', type: 'checkbox', event: toggleAllAsCompleted }),
    label({ for: 'toggle-all' }, 'Mark all as complete'),
    ul({ class: 'todo-list' }, todoList)
);