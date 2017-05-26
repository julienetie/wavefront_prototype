<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>
<p>&nbsp;</p>

`Alpha, working prototype in development`

# A cutting edge frontend view layer library.

<img src="https://media.giphy.com/media/7hvkctkRc3Q6Q/giphy.gif" width="150">

"Ugh not another one, off my lawn!" So what's the difference?

## Wavefront featuers:
- Delarative templating
- View / Logic separation
- Virtual DOM diffing (of course)
- Reverse Virtual-DOM Interface
- UI helpers
- Synthetic and delegated event system
- Navigation API for time travel, state management, history and routing


## Why?
1. Discourages [vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in)
2. Light weight
3. Templating syntax has the exact notation of HTML/ SVG
4. Features a complete separation of logic and semantics
5. Requires no transpiler
6. Child nodes do not require an outer container
7. First-class everything
8. No dependencies
9. No build eco-system or build dependencies
10. A non-eco-system for integrating existing vanilla Js libraries
11. SEO without requering server-side rendering


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

MIT (C) Julien Etienne 2017
