import {div} from './wavefront';
/*______________________________________*/
let someElement =
    div(`class="container" id="some-id"`,
        div('',
            div('id="some-id"',
                div('id="some-id"',
                    div('id="some-id"',
                        div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', { someOtherElements: 'wfewefwef' }, { list1: 'wfewefwef', list2: 'hytht', list4: 'fwefw' }, 'Hello World')
                    )
                )
            )
        )
    );
/*______________________________________*/

document.body.appendChild(someElement.element);
console.log('TREE', someElement);