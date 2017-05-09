import { footer, small } from '../../../../../../dist/hypertext.es.js';

const footerSection = (copyrightAuthor, license, year) =>
    footer({ class: 'footer' }, [
        small({}, `© ${copyrightAuthor} ${license} ${year}`)
    ]);

export default footerSection;
