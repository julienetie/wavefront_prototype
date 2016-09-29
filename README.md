![](http://oi66.tinypic.com/fmrlnc.jpg)
 
A promising little ES6 project (working... but) still being prototyped, (Not ready for production).

Wavefront is a user interface creation library that...

- Has a readable syntax for creating HTML nodes.
- Directly replicates Markup for HTML, XML and SVG.
- Dosen't require a transformer i.e. JSX 
- Built with ES6 for use with ES6.
- Uses DOM diffing.
- Clearly separates concerns for existing nodes, created nodes, DOM traversing, data binding, ordering and events/mutations. 
- Has intuitive render management.
- Compliments standard JavaScript methods (Not an eco system).

Wavefront is a view/ UI library _(.e.g, jQuery, React)_ that enforces pre-creation over re-inserting and translation over destruction where feasible. Utilizing wavefront's methodology will reduce expensive DOM manipulation.


_Example:_ 
```
    div(`@class="container" id="some-id1"`,
        span(
            div('@class="some-class"'
                ul(
                    li('@id="some-id2" data-attribute=" some data"',
                        a('@href="http://google.com" contenteditable="" name="bob"', 
                            'Hello World!'
                        )
                    )
                )
            )
        ),    
        span(
            div('@class="some-class"'
                ul(
                    li('@id="some-id3" data-attribute=" some data"',
                        a('@href="http://facebook.com" contenteditable="" name="bob"', 
                            'How are you?'
                        )
                    )
                )
            )
        )
    );
```
_Will generate:_
```
<div class="container" id="some-id1">
    <span>
        <div class="some-class">
            <ul>
                <li id="some-id2" data-attribute="some data">
                    <a contenteditable=""  href="http://google.com" id="some-id">
                      Hello World! 
                    </a>
                </li>
            </ul>
        </div>
    </span>
    <span>
        <div class="some-class">
            <ul>
                <li id="some-id3" data-attribute="some data">
                    <a contenteditable=""  href="http://facebook.com" id="some-id">
                      How are you?
                    </a>
                </li>
            </ul>
        </div>
    </span>
</div>
```
MIT License - 2016 - Julien Etienne 
