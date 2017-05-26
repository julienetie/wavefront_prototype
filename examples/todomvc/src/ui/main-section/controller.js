import mainSection from './view';
import todoItem from '../todo-item/controller';
import act from '../';
import tree from '../../tree';

const todoState = tree.select(['state', 'todoItems']);
tree.set(['state', 'view'], 'all');
const viewState = tree.select(['state', 'view']);
const editState = tree.select(['state', 'editing']);


const toggleAllAsCompleted = {
    click: () => act('TOGGLE_ALL_AS_COMPLETED')
}


let i = 0;
let allCompletedState = false;
const controller = (cmd, data) => {
    switch (cmd) {
        case 'ADD_TODO':
            i++;
            todoState.push({
                id: i,
                completed: false,
                editing: false,
                text: data.value
            });
            break;
        case 'REMOVE_TODO':
            const excludedList = todoState.get()
                .filter((todo, i) => data.id !== todo.id);
            todoState.set(excludedList);
            break;
        case 'TOGGLE_COMPLETED_TODO':
            const toggleCompletedList = todoState.get()
                .map(todo => {
                    if (data.id === todo.id) {
                        return {
                            completed: !todo.completed,
                            id: todo.id,
                            text: todo.text,
                            editing: todo.editing
                        }
                    }
                    return todo;
                });
            todoState.set(toggleCompletedList);
            break;
        case 'TOGGLE_VIEW':
            viewState.set(data.view);
            break;
        case 'EDIT_TODO':
            const isEditing = editState.get();
            if (!isEditing) {
                editState.set(true);
                const updateTodoAsEditing = todoState.get()
                    .map(todo => {
                        if (data.id === todo.id) {
                            return {
                                completed: todo.completed,
                                id: todo.id,
                                text: todo.text,
                                editing: !todo.editing
                            }
                        }
                        return todo;
                    });
                todoState.set(updateTodoAsEditing);
            }
            break;
        case 'SAVE_TODO_EDIT':
            const saveTodoEditInList = todoState.get()
                .map(todo => {
                    if (data.id === todo.id) {
                        return {
                            completed: todo.completed,
                            id: todo.id,
                            text: data.text,
                            editing: false
                        }
                    }
                    return todo;
                });
            todoState.set(saveTodoEditInList);
            editState.set(false);
            break;
        case 'TOGGLE_ALL_AS_COMPLETED':
            allCompletedState = !allCompletedState;
            const toggleAllTodosAsCompleted = todoState.get()
                .map(todo => ({
                    completed: allCompletedState,
                    id: todo.id,
                    text: todo.text,
                    editing: todo.editing
                }));
            todoState.set(toggleAllTodosAsCompleted);
            break;
        case 'CLEAR_COMPLETED':
            const clearCompletedTodos = todoState.get()
                .filter(todo => !todo.completed)
            todoState.set(clearCompletedTodos);
            break;
    }



    const view = viewState.get();
    const todoList = todoState.get()
        .filter(todo => {

            const todoFilter = {
                active: !todo.completed,
                all: todo,
                completed: todo.completed
            }
            return todoFilter[view];
            // switch (view) {
            //     case 'active':
            //         return !todo.completed;
            //     case 'completed':
            //         return todo.completed;
            //     case 'all':
            //         return todo;
            // }
        })
        .map(todoState => todoItem(todoState))


    return mainSection({
        todoList,
        toggleAllAsCompleted
    });
}
export default controller;
