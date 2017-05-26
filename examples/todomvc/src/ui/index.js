import { section, div, render } from '../../../../dist/wavefront.es';
import footer from './footer/controller';
import info from './info/controller';
import header from './header/controller';
import mainSection from './main-section/controller';

export default (cmd, data) => {
    const vNode =
        div(
            section({ class: 'todoapp' },
                header(cmd),
                mainSection(cmd, data),
                footer(cmd, data),
            ),
            info(cmd, data),
        );
    // Render to DOM.
    render('#root', vNode);
};
