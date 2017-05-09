import { h1, h2 } from '../../../../../../dist/hypertext.es.js';

const headings = (heading1, heading2) => [
    h1({ class: 'heading' }, heading1),
    h2({ class: 'heading2' }, heading2)
];
export default headings;
