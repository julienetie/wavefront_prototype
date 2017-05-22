import { div } from '../../../../../../dist/wavefront.es.js';

export default (LCDDisplayContent = 0) =>
div({ class: 'display' },
    div({ class: 'virtual-display' }, LCDDisplayContent)
);
