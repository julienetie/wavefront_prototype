import { input } from '../../../../../../dist/wavefront.es.js';
export default (value, saveTodo, focusOnInput) =>
input({
    class: 'edit',
    value,
    event: saveTodo,
    hook: focusOnInput
});
