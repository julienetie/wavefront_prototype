import h from 'snabbdom/h';
import todoItem from '../todo-item/view';

const mainSection = ({ todoList, toggleAllAsCompleted }) => {
    return h('section.main', [
        h('input.toggle-all', { props: { type: 'checkbox' }, on: toggleAllAsCompleted }),
        h('label', { props: { htmlFor: 'toggle-all' } }, 'Mark all as complete'),
        h('ul.todo-list', todoList)
    ]);
}

export default mainSection;
