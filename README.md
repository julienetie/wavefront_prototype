<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>
<p>&nbsp;</p>

`Alpha, working prototype in development: Not ready for production`

# A View Layer Based On JavaScript
One of strongest aspects of JavaScript is that everything is an object.
We can harness this power to create user interfaces from the point of 
view of the end result rathter than an eco-system?

## Wavefront featuers:
- Declarative Templates (higher order, logicless templates)
- Complete separatoin of logic from presentation
- Render to the DOM
- Abstract from the DOM
- Render partials
- Statically generate HTML
- No eco-system
- Less than 2Kb


<img src="https://media.giphy.com/media/7hvkctkRc3Q6Q/giphy.gif" width="150">

"Ugh not another one, off my lawn!" So what's the difference?



## Why?
Because when considering the **END RESULT** of a project:
- Industry standards frameworks are massively overkill in terms of API complexities.
- Industry standards frameworks tend to perfom poorly with increasing UI complexities.
- Industry standards frameworks require too much complex and specific tooling. 
- Separation of Concerns is important for future maintenance.
- Statically generated HTML is far more favourable than server side rendering.
- Objects and first-class arguments are natural to the language.


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

MIT (C) Julien Etienne 2018
