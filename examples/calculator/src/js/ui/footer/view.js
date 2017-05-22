import { footer, small } from '../../../../../../dist/wavefront.es.js';

export default (copyrightAuthor, license, year) =>
footer({ class: 'footer' },
    small(`© ${copyrightAuthor} ${license} ${year}`)
);
