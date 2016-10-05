// import { patch, elementOpen, elementClose, elementVoid, text } from '../libs/incremental-dom-es6';
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

// // Rules: Every attribute must have an equals sign:
// // var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')


// // var message = 'don\'t forget to turn the oven off';
// // var comment = document.createComment(message);

// // var comment = __.comment('don\'t forget to turn the oven off');           
// /*______________________________________*/
// // let someElement = 
// //     div(`class="container" id="some-id"`, 'This is inserted before nested elements',
// //         div('',comment,
// //             div('id="some-id"',
// //                 div('id="some-id" style="background:red;"',
// //                     div('id="some-id"',
// //                         div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'January')
// //                     )
// //                 )
// //             ),
// //             div('id="some-id"',
// //                 div('id="some-id"',
// //                     div('id="some-id"',
// //                         div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'februrary')
// //                     )
// //                 )
// //             ),
// //         ), 'This is inserted after nested elements');
// /*______________________________________*/
// // __.append(1,2,3,4,5,6,'someParentElement')
// // console.log('__', __, 'div', div, 'li', li);


/****DATA *****/
__.data.testPage = {
    _image: {
        src: 'http://www.windowsdevbootcamp.com/Images/JennMar.jpg',
        width: 85,
        height: 85,
        alt: 'Jennifer Marsman'
    },
    _articleSection2: 'This is the second article. These articles could be blog posts, etc.',
    _article1Header: 'Article #1h1'
}
/****DATA *****/



__.dynamic('testPage', ({ _image, _articleSection2, _article1Header }) => {

    /**
     * Tracking:: (Variables that are allowed to change)
     */
    let image = __.track(_image, 'dImage');
    let articleSection2 = __.track(_articleSection2, 'vArticle');
    let article1Header = __.track(_article1Header, 'vArticle');
    /*__________________________________________________*/
    return [header(
            h1('_Header in h1'),
            comment('This is a comment'),
            h2('_Subheader in h2'),
        ),
        nav(
            ul(
                li(a({ href: 'http://google.com', class: 'some-class' }, 'Menu Option 1a')),
                li(a({ href: 'http://facebook.com', class: 'some-class' }, 'Menu Option 2a')),
                li(a({ href: 'http://youtube.com' }, 'Menu Option 3a'))
            )
        ),
        section(
            article(
                header(
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
                section(
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
