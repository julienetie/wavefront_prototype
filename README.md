This is a promising little ES6 project still in its prototyping phase.
Wavefront is for in-depth and maintainable DOM manipulation and event handling. 


### Wavefront: 
- Clean and readable HTML element creation using pure JavaScript. 
- Manipulate the creation of nodes without limitations. 
- Create nested and sibling elements with custom attributes.
- No transformer is required. 
- For use with ES6 modules.
- Library separation of concerns produce high performance distributions.

#### Pending
- Create all HTML5 nodes (import all or select specific tag names)
- Add string parameters as text. 
- Add element, comment, document and processing instruction nodes.
- Manipulate elements via a custom looping method. 

### Future Modules 
- Create: ^ For DOM creation.* 
- Pre-order: Element traversing.
- Reflex: Event delegation.
- Forever: For continuous node creations (e.g. ajax infinite scroll, news feed list).
- Mimetic-api: Integrations with Mimetic. 

_Rough example:_ 
```
    div(`class="container" id="some-id"`,
        div('',
            div('id="some-id"',
                div('id="some-id"',
                    div('id="some-id"',
                        div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', { someOtherElements: 'wfewefwef' }, { list1: 'wfewefwef', list2: 'hytht', list4: 'fwefw' }, 'Hello World')
                    )
                )
            ),
            div('id="some-id"',
                div('id="some-id"',
                    div('id="some-id"',
                        div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', { someOtherElements: 'wfewefwef' }, { list1: 'wfewefwef', list2: 'hytht', list4: 'fwefw' }, 'Hello World')
                    )
                )
            )
        )
    );
```
Will generate:
```
<div class="container" id="some-id">
    <div>
        <div id="some-id">
            <div id="some-id">
                <div id="some-id">
                    <div class="container" contenteditable="" data-attribute=
                    "some data" id="some-id"></div>
                </div>
            </div>
        </div>
        <div id="some-id">
            <div id="some-id">
                <div id="some-id">
                    <div class="container" contenteditable="" data-attribute=
                    "some data" id="some-id"></div>
                </div>
            </div>
        </div>
    </div>
</div>
```
