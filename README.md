<p align="center"><img src="http://oi66.tinypic.com/fmrlnc.jpg" ></p>
<p>&nbsp;</p>

`Alpha, in development`

Wavefront is an cutting edge frontend view layer library.

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
