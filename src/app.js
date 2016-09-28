import dotenv from 'dotenv';
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
    footer
} from './wavefront';
// var dotenv =require('dotenv').config();

window.WAVEFRONT_ENV = 'dev';


// Rules: Every attribute must have an equals sign:
// var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')


// var message = 'don\'t forget to turn the oven off';
// var comment = document.createComment(message);

// var comment = __.comment('don\'t forget to turn the oven off');           
/*______________________________________*/
// let someElement = 
//     div(`class="container" id="some-id"`, 'This is inserted before nested elements',
//         div('',comment,
//             div('id="some-id"',
//                 div('id="some-id" style="background:red;"',
//                     div('id="some-id"',
//                         div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'January')
//                     )
//                 )
//             ),
//             div('id="some-id"',
//                 div('id="some-id"',
//                     div('id="some-id"',
//                         div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'februrary')
//                     )
//                 )
//             ),
//         ), 'This is inserted after nested elements');
/*______________________________________*/
// __.append(1,2,3,4,5,6,'someParentElement')
// console.log('__', __, 'div', div, 'li', li);

/**
 * Data
 */
const image = {
    src: 'http://www.windowsdevbootcamp.com/Images/JennMar.jpg',
    width: 85,
    height: 85,
    alt: 'Jennifer Marsman'
}
const imgAttr = `@width="${image.width}" height="${image.height}" src="${image.src}" alt="${image.alt}"`;
const articleSection2 = 'This is the second article. These articles could be blog posts, etc.';
const article1Header = 'Article #1h1';

/*__________________________________________________*/
__.append(
    header(
        h1('Header in h1'),
        h2('Subheader in h2')
    ),
    nav(
        ul(
            li(a('@href="#"', 'Menu Option 1a')),
            li(a('@href="#"', 'Menu Option 2a')),
            li(a('@href="#"', 'Menu Option 3a'))
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
        ),
    ),
    aside(
        section(
            h1('Linksh1'),
            ul(
                li(a('@href="#"', 'Link 1a')),
                li(a('@href="#"', 'Link 2a')),
                li(a('@href="#"', 'Link 3a'))
            ),
        ),
        figure(
            img(imgAttr),
            figcaption('Jennifer Marsman')
        )
    ),
    footer('Footer - Copyright 2016'),
    document.body);
/*__________________________________________________*/


// Append to the page.
// document.body.appendChild(someElement.node);
// console.log('TREE', someElement);
