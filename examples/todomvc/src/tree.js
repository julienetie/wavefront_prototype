import appData from './app-data.json';
import Baobab from '../libs/baobab.es';

appData.state = {
    todoItems: appData.defaults.todoItems,
    view: appData.defaults.view,
    editing: appData.defaults.editing,
};

export default new Baobab(appData);
