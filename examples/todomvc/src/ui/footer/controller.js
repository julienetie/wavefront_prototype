import footer from './view';
import act from '../';
import tree from '../../tree';

const todoState = tree.select(['state', 'todoItems']);
const viewStateRef = tree.select(['state', 'view']);
const props = {};

const toggleViewEvent = viewName => ({
    click: () => act('TOGGLE_VIEW', { view: viewName }),
});

const clearCompleteEvent = {
    click: () => act('CLEAR_COMPLETED'),
};

let show = false;
const controller = (cmd) => {
    const itemsLeft = todoState.get()
        .filter(todo => todo.completed === false).length;

    if (cmd === 'TOGGLE_ALL_AS_COMPLETED') {
        show = !show;
    }

    const viewState = {
        all: '',
        active: '',
        completed: '',
    };

    viewState[viewStateRef.get()] = 'selected';

    props.itemsLeft = itemsLeft || '0';
    props.all = toggleViewEvent('all');
    props.active = toggleViewEvent('active');
    props.completed = toggleViewEvent('completed');
    props.clearComplete = clearCompleteEvent;
    props.clearCompletedButton = show ? 'block' : 'none';
    props.viewState = viewState;
    return footer(props);
};

export default controller;
