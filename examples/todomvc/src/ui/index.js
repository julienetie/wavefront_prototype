import { section, div, render } from '../../../../dist/wavefront.es';
import h from 'snabbdom/h';
import footer from './footer/controller';
import info from './info/controller';
import header from './header/controller';
import mainSection from './main-section/controller';
import todoItem from './todo-item/controller';
import act from '../act';


// const todoApp = document.getElementById();

const interfaces = (cmd, data) => {
    const vNode =
        div(
            section({ class: 'todoapp' },
                header(),
                mainSection(cmd, data),
                footer()
            ),
            info(cmd, data)
        );
    render('#root', vNode);
}


export default interfaces;
