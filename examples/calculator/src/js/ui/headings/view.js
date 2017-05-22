import { h1, h2 } from '../../../../../../dist/wavefront.es.js';

export default (heading1, heading2) => [
    h1({ class: 'heading' }, heading1),
    h2({ class: 'heading2' }, heading2)
];
