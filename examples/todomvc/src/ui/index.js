import { section, div } from '../../../../dist/wavefront.es.js';
import h from 'snabbdom/h';
import footer from './footer/controller';
import info from './info/controller';
import header from './header/controller';
import mainSection from './main-section/controller';
// import document from './document/controller';
import todoItem from './todo-item/controller';
import { render } from '../wavefront';
import act from '../act';

let oldVnode;

const todoApp = document.getElementById('root');
console.log(document)

const interfaces = (cmd, data) => {

    /**
     * 
     */
    // document();

    const newVNode =
        div({}, [
            section({class:'todoapp'}, [
                header(),
                mainSection(cmd, data),
                footer()
            ]),
            info(cmd, data)
        ]);

    // const newVNode = h('div', [

    //     h('section.todoapp', [
    //         header(),
    //         mainSection(cmd, data),
    //         footer()
    //     ]),
    //     info(cmd, data)
    // ]);

    render(
        todoApp,
        newVNode,
        oldVnode
    );

    oldVnode = newVNode;
}


export default interfaces;
