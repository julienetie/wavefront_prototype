import todoItem from './view';
import act from '../';

const props = {};

const toggleComplete = (index) => {
    return {
        click: () => {
            act('TOGGLE_COMPLETED_TODO', { index });
        }
    }
}

const editTodo = (index) => {
    return {
        dblclick: (e) => {
            act('EDIT_TODO', { index });
        }
    }
}


const saveTodo = (index, editedValue) => {
    const saveTodoEdit = (e, index) => {
        act('SAVE_TODO_EDIT', { index, editiedValue: e.target.value.trim() });
    }
    return {
        blur: (e) => {
            const value = e.target.value.trim();
            if (value) {
                saveTodoEdit(e, index);
            } else {
                act('REMOVE_TODO', { index });
            }
        },
        keypress: (e) => {
            const value = e.target.value.trim();
            if (e.keyCode === 13 && value) {
                saveTodoEdit(e, index);
            }
        }
    }
}


const removeTodo = (index) => {
    return {
        click: () => {
            act('REMOVE_TODO', { index });
        }
    }
}


const controller = (completed, value, ignore, editing, index) => {
    props.value = value;
    props.toggleComplete = toggleComplete(index);
    props.removeTodo = removeTodo(index);
    props.completed = completed;
    props.editing = editing;
    props.editTodo = editTodo(index);
    props.saveTodo = saveTodo(index, value);
    return todoItem(props);
}

export default controller;
