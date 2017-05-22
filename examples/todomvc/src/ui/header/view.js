import { header, h1, input } from '../../../../../dist/wavefront.es.js';

/**
 * Header.
 * @param...
 */
export default ({ returnKey }) =>
header({ class: 'header' }, [
    h1('todos'),
    input({
        class: 'new-todo',
        placeholder: 'What needs to be done?', 
        autofocus: 'autofocus',
        event: returnKey
    })
]);

