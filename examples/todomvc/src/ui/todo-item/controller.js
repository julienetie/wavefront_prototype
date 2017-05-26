import todoItem from './view';
import act from '../';
import editInput from './view/edit-input';

const toggleCompleteEvent = id => ({
    click: () => act('TOGGLE_COMPLETED_TODO', { id: id })
});


const editTodoEvent = id => ({
    dblclick: e => act('EDIT_TODO', { id, target: e.target })
});


const saveTodoEvent = (id, editedValue) => {
    const saveTodoEdit = (e, id) => {
        const text = e.target.value.trim();
        if (text === '') {
            act('REMOVE_TODO', { target: e.target.closest('li'), id })
            act('SAVE_TODO_EDIT', { id, text });
        } else {
            act('SAVE_TODO_EDIT', { id, text });
        }
    }

    return {
        change: e => {
            saveTodoEdit(e, id)
        },
        blur: e => {
            saveTodoEdit(e, id);
        },
        keyDown: e => {
            if (e.which === 13) {
                saveTodoEdit(e, id);
            }
        }
    }
}


const removeTodoEvent = id => ({
    click: e => act('REMOVE_TODO', {
        target: e.target,
        id
    })
});


const focusOnInput = {
    insert: vNode => {
        const el = vNode.elm;
        setTimeout(function(){ el.selectionStart = el.selectionEnd = 10000; }, 0);
        el.focus();
    }
};

/**
 * @param
 */
export default ({ completed, id, text, editing }) => {
    const props = {
        value: text,
        toggleComplete: toggleCompleteEvent(id),
        removeTodo: removeTodoEvent(id),
        completed: completed ? 'completed' : '',
        editing: editing ? 'editing' : '',
        editInput: editing ? editInput : () => {},
        editTodo: editTodoEvent(id),
        saveTodo: saveTodoEvent(id, text),
        focusOnInput
    }
    return todoItem(props);
}