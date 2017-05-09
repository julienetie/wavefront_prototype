import { div } from '../../../../../../dist/hypertext.es.js';

const display = (LCDDisplayContent = 0) =>
    div({ class: 'display' }, [
        div({ class: 'virtual-display' }, LCDDisplayContent)
    ]);

export default display;
