import { footer, p, a } from '../../../../../dist/wavefront.es.js';

export default () =>
footer({ class: 'info' },
    p('Double-click to edit a todo'),
    p('Created by ',
        a({ href: 'https://github.com/julienetie' },
            'Julien Etienne'
        )
    ),
    p('Part of',
        a({ href: 'http://todomvc.com' })
    )
);
