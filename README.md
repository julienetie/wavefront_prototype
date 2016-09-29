![](http://oi66.tinypic.com/fmrlnc.jpg)
 
A promising little ES6 project (working... but) still being prototyped, (don't use this it in production).
Wavefront is a user interface creation library that...

- Has a readable syntax for creating HTML nodes.
- Directly replicates Markup for HTML, XML and SVG.
- Dosen't require a transformer i.e. JSX 
- Built with ES6 for use with ES6.
- Clearly separates concerns for existing nodes, created nodes, DOM traversing, data binding, ordering and events/mutations. 
- Has intuitive render management.
- Compliments standard JavaScript methods (Not an eco system).

Wavefront is a view/ UI library _(.e.g, jQuery, React)_ that enforces pre-creation over re-inserting and translation over destruction where feasible. Utilizing wavefront's methodology is likely to yield "practical" performance and memory consumption that rivals common DOM diffing algorithms.


_Example:_ 
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
_Will generate:_
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
MIT License - 2016 - Julien Etienne 
