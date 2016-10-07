import {
    __,
    header,
    h1,
    h2,
    nav,
    ul,
    li,
    a,
    section,
    article,
    mark,
    aside,
    figure,
    img,
    figcaption,
    footer,

    comment
} from './wavefront-v2';


// window.WAVEFRONT_ENV = 'dev';
__.polyfills();

/*
 * ./data/
 */
__.model.testPage = {
        _image: {
            src: 'https://www.google.co.uk/logos/doodles/2016/100th-anniversary-of-completion-of-the-trans-siberian-railway-6269398706814976-vacta.gif',
            width: 85,
            height: 85,
            alt: 'Jennifer Marsman'
        },
        _articleSection2: 'This is the second article. These articles could be blog posts, etc.',
        _article1Header: 'Article #1h1'
    }
__.model.otherPage = {
        _image: {
            src: 'https://www.google.co.uk/logos/doodles/2016/100th-anniversary-of-completion-of-the-trans-siberian-railway-6269398706814976-vacta.gif',
            width: 85,
            height: 85,
            alt: 'Jennifer Marsman'
        },
        _articleSection2: 'This is the second article. These articles could be blog posts, etc.',
        _article1Header: 'Article #1h1'
    }
    /****DATA *****/


/*
 * ./interface/dynamic/*
 */
__.dynamic('testPage', ({ _image, _articleSection2, _article1Header, name }) => {
    /**
     * Tracking:: (Variables that are allowed to change)
     */
    let red = 'red';
    let image = __.track(name, _image, 'dImage');
    let articleSection2 = __.track(name, _articleSection2, 'vArticle');
    let article1Header = __.track(name, _article1Header, 'vArticle');

    /*__________________________________________________*/
    return [
        header({ class: 'red', 'data-hello': 'World!', style: `background: ${red}; height:auto` },
            h1('Header in h1'),
            comment('This is a comment'),
            h2('Subheader in h2'),
        ),
        comment('YEa yea yea yYAAAA whatever'),
        'This is crazy',
        nav(
            ul(
                li(a({ href: 'http://google.com', class: 'some-class' }, 'Menu Option 1a')),
                li(a({ href: 'http://facebook.com', class: 'some-class' }, 'Menu Option 2a')),
                li(a({ href: 'http://youtube.com' }, 'Menu Option 3a'))
            )
        ),
        section(
            article(
                header({ wave: 'juliensHeader' },
                    h1(article1Header)
                ),
                section(
                    'This is the first article. This is',
                    mark('highlightedmark'),
                    '.'
                ),
            ),
            article(
                header(
                    h1('Article #2h1')
                ),
                section({ id: 'whatsUpJack' },
                    articleSection2
                ),
            )
        ),
        aside(
            section(
                h1('Linksh1'),
                ul(
                    li(a({ href: '#' }, 'Link 1a')),
                    li(a({ href: '#' }, 'Link 2a')),
                    li(a({ href: '#' }, 'Link 3a'))
                ),
            ),
            figure(
                img(image),
                figcaption('Jennifer Marsman')
            )
        ),
        footer('Footer - Copyright 2016')
    ];
    /*__________________________________________________*/
});



/*
 * ./interface/dynamic/*
 */
__.dynamic('otherPage', ({ _image, _articleSection2, _article1Header, name }) => {
    /**
     * Tracking:: (Variables that are allowed to change)
     */
    let red = 'red';
    let image = __.track(name, _image, 'dImage');
    let articleSection2 = __.track(name, _articleSection2, 'vArticle');
    let article1Header = __.track(name, _article1Header, 'vArticle');

    /*__________________________________________________*/
    return [
        header({ class: 'red', 'data-hello': 'World!', style: `background: yellow; height:auto` },
            h1('This is another interface'),
            comment('This is a comment'),
            h2('Subheader in h2'),
        ),
        comment('YEa yea yea yYAAAA whatever'),
        'This is another interface',
        nav(
            ul(
                li(a({ href: 'http://google.com', class: 'some-class' }, 'Menu Option 1a')),
                li(a({ href: 'http://facebook.com', class: 'some-class' }, 'Menu Option 2a')),
                li(a({ href: 'http://youtube.com' }, 'Menu Option 3a'))
            )
        ),
        section(
            article(
                header({ wave: 'juliensHeader' },
                    h1(article1Header)
                ),
                section(
                    'This is another interface',
                    mark('highlightedmark'),
                    '.'
                ),
            ),
            article(
                header(
                    h1('This is another interface')
                ),
                section({ id: 'whatsUpJack' },
                    articleSection2
                ),
            )
        ),
        aside(
            section(
                h1('Linksh1'),
                ul(
                    li(a({ href: '#' }, 'Link 1a')),
                    li(a({ href: '#' }, 'Link 2a')),
                    li(a({ href: '#' }, 'Link 3a'))
                ),
            ),
            figure(
                img(image),
                figcaption('Jennifer Marsman')
            )
        ),
        footer('Footer - Copyright 2016')
    ];
    /*__________________________________________________*/
});

/*
 * ./render/*
 */
var HTMLInterface1 = document.querySelector('.main-section');
var HTMLInterface2 = document.querySelector('.other-section');

__.render.dynamic.testPage(HTMLInterface1);
__.render.dynamic.otherPage(HTMLInterface2);



window.__ = __;
