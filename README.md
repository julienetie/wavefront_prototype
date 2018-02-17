<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>
<p>&nbsp;</p>

`Alpha, working prototype in development: Not ready for production`

# A View Layer Based On JavaScript
One of strongest aspects of JavaScript is that everything is an object.
We can harness this power to create user interfaces from the point of 
view of the end result rather than an eco-system?

## Wavefront features:
- Declarative Templates (higher order, logic-less templates)
- Complete separation of logic from presentation
- Render to the DOM
- Abstract from the DOM
- Render partials
- Statically generate HTML
- No eco-system
- Less than 2Kb

## Why is Wavefront necessary?
When considering the **END RESULT** of a project:
- Current industry standard frameworks are massively overkill in terms of API complexities.
- Current industry standard frameworks tend to perform poorly with increasing UI complexities.
- Current industry standard frameworks require too much complex and specific tooling. 
- Separation of Concerns is important for future maintenance.
- Statically generated HTML is far more favourable than server side rendering.
- Objects and first-class arguments are natural to the language.


HTML is a simple semantic language that can be represented and manipulated in JavaScript using the paradigms of JavaScript.  

### Wavefront → DOM | DOM → Wavefront
If you are building a SPA  _(**Singe Page Application**)_, it may be ideal to build UIs in JS as waveNodes and render them to the DOM.
```javascript 
const render = initalize('#container', waveNode) // Renders a waveNode to the DOM and returns a render method. 
```

If you are building a MPA _(**Multi Page Application**)_, it may be preffered to serve UIs as HTML and then abstract them into Wavefront to enable interactivity.
```javascript 
const waveNode = abstract('#container') // Converts a DOM tree to a waveNode.
```

Or both.

### Partial Rendering
Partial rendering let's you search the cached DOM, modify specific nodes and then perform a render.  

- Insert node before
- Insert node after
- Replace node 
- Remove node 
- Replace attribute
- Remove attribute

Nodes are located using the **querySelector** and **querySelectorAll** syntax. Commands are performed using Wavefront's partial commands.

```javascript 
render() // Partial renders are returned by the intialize function. 

render({
    '.menu nav a': a({class: 'active', id: 'contact'}, 'CONTACT US') 
}); 
```
The above will replace the first _.menu nav a_ selector. 


```javascript 
render.all({
    '.menu nav a': a({class: 'active', id: 'contact'}, 'CONTACT US') 
}); 
```
The above will update all _.menu nav a_ selectors. 

### What are Declarative Templates
WaveFront...

```javascript
import { div, h1, p, figure, figcaption, img } from 'wavefront'

export default ({ someClass, someId, greeting }) =>
/**
 * Greeting with three cat images.
 */
div({ class: someClass, id: someId },
    h1(greeting),
    p('How are you?'),
    figure({ class: 'images' },
        figcaption('Three different breeds of cats.'),
        img({ alt: 'Shorthair', src: 'shorthair.jpg' }),
        img({ alt: 'Siamese', src: 'siamese.jpg' }),
        img({ alt: 'Sphynx', src: 'sphynx.jpg' })
    )
)
```
HTML Output...
```html
<div class="welcome" id="intro">
    <h1>Hello World!</h1>
    <p>How are you?</p>
    <figure class="images">
        <figcaption>Three different breeds of cats.</figcaption>
        <img alt="Shorthair" src="shorthair.jpg">
        <img alt="Siamese" src="siamese.jpg">
        <img alt="sphynx" src="sphynx.jpg">
    </figure>
</div>
```
<p>&nbsp;</p>
<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>


MIT (C) Julien Etienne 2018
