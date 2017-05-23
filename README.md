<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>
<p>&nbsp;</p>

`Alpha, in development`

# A cutting edge frontend view layer library.

<img src="https://media.giphy.com/media/7hvkctkRc3Q6Q/giphy.gif" width="150">

"Ugh not another one, off my lawn!" So what's the difference?

## Wavefront featuers:
- Delarative templating
- View / Logic separation
- Virtual DOM diffing (of course)
- Reverse Virtual-DOM Interface
- UI helpers
- Single and delegated event system
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


### WaveModules
Wavefront is basically a templating system, design pattern and virtual-DOM interface, you can get started using it's immediate features. Wavefront is not an eco-system, it promotes the use of existing vanilla JavaScript libraries by encoueaging wrappers called waveModules. A waveModule is a plugin that acts as an interface for an existing JavaScript plugin to integrate with Wavefront. For example:

- wavefront-history
- wavefront-baobab
- wavefront-router

The above three wavePlugins only contains the wavefront API code but imports the plugin code as ES modules. Why re-write and maintain what already exist? 



### Declarative Templates
- A pure JavaScript templating system in the exact notion of the markup language you're using.
- A complete and enforcable separation of logic from semantics.
- Element wrapping is not required.
- No new syntax

### Red-Sea Components
- Each component contains atleast a view.js file or /view directory
- Pre-logic components also contain a controller.js or /controller directory.
- Strictly no templates within controllers and no presentation within the view with the exception of single elements.

### Virtual-DOM (Snabbdom)
- Uses Snabbdom's high performance virtual-dom under the hood.

### Reverse Virtual-DOM
- Build interfaces in real HTML for SEO.
- Build only what will be interactive.
- Overwrite virtual child selectors.
- No server side rendering required, but optional.

### Events management (Yogafire)
- Option to delegate events or listen individually

MIT (C) Julien Etienne 2017
