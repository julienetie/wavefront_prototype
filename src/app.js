import div from './wavefront';

// Rules: Every attribute must have an equals sign:
// var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')
var __ = {}
__.comment = (message)=>{
    return document.createComment(message);
};

// var message = 'don\'t forget to turn the oven off';
// var comment = document.createComment(message);
              
  var comment = __.comment('don\'t forget to turn the oven off');           
/*______________________________________*/
let someElement = 
    div(`class="container" id="some-id"`, 'This is inserted before nested elements',
        div('',comment,
            div('id="some-id"',
                div('id="some-id" style="background:red;"',
                    div('id="some-id"',
                        div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'January')
                    )
                )
            ),
            div('id="some-id"',
                div('id="some-id"',
                    div('id="some-id"',
                        div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'februrary')
                    )
                )
            )
        ), 'This is inserted after nested elements');
/*______________________________________*/

// Append to the page.
document.body.appendChild(someElement.node);
console.log('TREE', someElement);

