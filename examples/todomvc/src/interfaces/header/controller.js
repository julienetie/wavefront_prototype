import header from './view';
import act from '../';

const returnKey = {
    keypress: (e) => {
    	const value = e.target.value.trim();
        if (e.keyCode === 13 && value) {
            act('ADD_TODO', {value});
            e.target.value = '';
        }
    }
}


const props = {
    returnKey
}


const controller = (cmd, data) => {
    return header(props)
}

export default controller;
