import view from './view';
import act from '../';
import tree from '../../tree';

const { heading, placeholder } = tree.get('content');

const returnHandlerPartial = () => {
    let i = 0;
    return (e) => {
        const target = e.target;
        const value = target.value.trim();
        if (e.keyCode === 13 && value.length) {
            i++;
            act('ADD_TODO', { value });
            target.value = '';
        }
    };
};

const returnHandler = returnHandlerPartial();

const returnKey = {
    keypress: returnHandler(e),
};

const props = {
    returnKey,
    heading,
    placeholder,
};

const controller = () => view(props);

export default controller;
