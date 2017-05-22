import footer from './view';
import o from '../../skeleton';
import act from '../';

const props = {};
const itemsLeft = o('itemsLeft');

const toggleView = (viewName) => {
    return {
        click: () => {
            act('TOGGLE_VIEW', { viewName });
        }
    }
}


const controller = () => {
    props.itemsLeft = itemsLeft[0];
    props.all = toggleView('all');
    props.active = toggleView('active');
    props.completed = toggleView('completed');
    return footer(props);
}

export default controller;
