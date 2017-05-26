import { header, h1, input } from '../../../../../dist/wavefront.es';

/**
 * Header.
 * @param...
 */
export default ({ returnKey, heading, placeholder }) =>
header({ class: 'header' }, [
    h1(heading),
    input({
        class: 'new-todo',
        autofocus: 'autofocus',
        event: returnKey,
        placeholder,
    }),
]);
