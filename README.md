<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>
<p>&nbsp;</p>
An agile UI creation library for speed and maintainability. *Alpha: No ready for production*

- Has a pure javascript syntax that doesn't require a transformer i.e. JSX  
- Creates interfaces based on markup (HTML, XML and SVG).
- Built with ES2015 to be used with ES2015
- Virtual DOM diffing.
- Efficiently reference any created/ existing nodes without additional lookups.
- Unified event system/ use standard events. 
- Separation of concerns oriented for optimal work flows and collaborations: Design | Model | Template | Bind | Dynamics. 
- Simply create dynamic interfaces, static frames and stateless interfaces for maintainability and simplicity. 
- This is just a DOM & events library, not an Eco-system.  

Wavefront is a view/ UI library _(.e.g, jQuery, React, )_ that aims to solve a few problems:

#### Speed and maintainability  
UI development on the web can mostly be broken down into:
- Structuring HTML
- Interacting with the DOM
- Listening for Events/ mutations and other changes
- Dynamic behaviors
- Stateless design
- Passing data to the view
- Shading, layout and rendering

#### Wavefronts work flow solution:
- Interface: An interactive "section" of the design or section that updates (Everything is not an interface).
- Dynamic Interface: The logic and template are separated within the same domain.
- Use unified event delegation or vanilla JS events.
- Static Interface: A dumb interface that can switch between various frames (like a flick book)
- Stateless Frame: A portion of the design that can not act or be acted on (Not like a button)
- Virtual DOM with node references: Use an Id, class or 'wave' prop to reference elements.
- Hosted HTML: Manipulate existing HTML code in exactly the same way (For accessibility/ SEO, ease of use)


_Example:_ 
```
    div({class: 'container'. id: 'some-id1'},
        span(
            div({class: 'some-class'},
                ul(
                    li({id: 'some-id2', 'data-attribute': ' some data'},
                        a({href: 'http://google.com', contenteditable: '', name: 'bob'}, 
                            'Hello World!'
                        )
                    )
                )
            )
        ),    
        span(
            div({class: 'some-other-class',
                ul(
                    li({id: 'some-id3', 'data-attribute': ' some data'},
                        a({href: 'http://google.com', contenteditable: '', title: 'This is a link'},  
                            'How are you?'
                        )
                    )
                )
            )
        )
    );
```
_Will produce:_
```
<div class="container" id="some-id1">
    <span>
        <div class="some-class">
            <ul>
                <li id="some-id2" data-attribute="some data">
                    <a contenteditable=""  href="http://google.com" name="bob">
                      Hello World! 
                    </a>
                </li>
            </ul>
        </div>
    </span>
    <span>
        <div class="some-other-class">
            <ul>
                <li id="some-id3" data-attribute="some data">
                    <a contenteditable=""  href="http://facebook.com" title="This is a link">
                      How are you?
                    </a>
                </li>
            </ul>
        </div>
    </span>
</div>
```

#### Recommended project structure:
- ./interface/dynamics*     Dynamic Interfaces & logic
- ./interface/static*       Static Interfaces & logic
- ./stateless/*             Stateless Frames
- ./model/*                 Assign data to an interface
- ./bindings/*              Bind data, events, render updates and more. 
- ./app.../*                App logic

The API was built with the above separation in mind, and is decoupled so templates and dynamic logic can be worked on at different times. The purpose of this separation was to encourage readable templates with separated logic so anyone who understands HTML will be able to build and edit Wavefront's pure JavaScript templates: 
MIT License - 2016 - Julien Etienne 
