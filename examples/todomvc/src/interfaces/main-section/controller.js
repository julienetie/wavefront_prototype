import mainSection from './view';
import todoItem from '../todo-item/controller';
import h from 'snabbdom/h';
import o from '../../skeleton';
import act from '../';

const todoItems = o('todos');
const itemsLeft = o('itemsLeft');
let view = 'all'; //o('view');

let completed = '';
let allDone = true;
let ref = 0;

const props = {};

const toggleCompleted = (currentToggle) => {
    return completed = currentToggle ? '' : '.completed';
}

const toggleAll = () => {
    if (allDone) {
        allDone = false;
        return '.completed';
    } else {
        allDone = true;
        return ''
    }
}


const toggleAllAsCompleted = () => {
    return {
        click: (e) => {
            act('TOGGLE_ALL_AS_COMPLETED');
        }
    }
}


const filter = (arr, viewName) => {
    return arr.filter((items) => {
        if (items[0] === viewName) {
            return items;
        }
    })
}


const controller = (cmd, data) => {
    const todoItemsLength = todoItems.length;

    switch (cmd) {
        case 'ADD_TODO':
            ref++;
            todoItems.push(['', data.value, ref, '']);
            break;
        case 'TOGGLE_COMPLETED_TODO':
            todoItems[data.index][0] = toggleCompleted(
                todoItems[
                    data.index
                ][0]);
            break;
        case 'REMOVE_TODO':
            todoItems.splice(data.index, 1);
            break;
        case 'TOGGLE_ALL_AS_COMPLETED':
            const completedStatus = toggleAll();
            todoItems.forEach((item, i) => {
                todoItems[i][0] = completedStatus;
            });
            break;
        case 'EDIT_TODO':
            todoItems[data.index][3] = '.editing';
            break;
        case 'SAVE_TODO_EDIT':
            todoItems[data.index][3] = '';
            todoItems[data.index][1] = data.editiedValue;
            break;
        case 'TOGGLE_VIEW':
            view = data.viewName || 'all';
            break;
    }

    // if (data.hasOwnProperty('viewName')) {

    //     view = data.viewName;
    // }




    const todoList = todoItems.filter((todoData, i) => {
        if (view === 'all') {
            return todoData;
        } else if (view === 'active') {
            if (!todoData[0]) {
                return todoData;
            }
        } else if (view === 'completed') {
            if (todoData[0]) {
                return todoData;
            }
        }
    }).map((todoData, i) => {
        return todoItem(...todoData, i);
    });
    console.log('todoList', todoList)

    itemsLeft[0] = todoItems.filter((item) => item[0] === '').length;

    props.todoList = todoList;
    props.toggleAllAsCompleted = toggleAllAsCompleted();
    return mainSection(props);
}
export default controller;
