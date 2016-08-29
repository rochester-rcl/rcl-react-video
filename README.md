# YARV

Yet Another React Video Component

<!-- START doctoc -->
<!-- END doctoc -->
## Installation and Usage

Clone this repo and ```js import VideoContainer from './lib/containers/videoContainer';` into your js entry point. ```

import any VideoJS plugins into your js entry point and add them to the plugins array. Configure your plugins as object literals:

```js
import nleControls  from './plugins/videojs-nle-controls.min';

let plugins = [
    {
        plugin: nleControls,
        name: 'nleControls',
        options: {
            framerate: 24.0,
            smpteTimecode: true,
            frameControls: true
        }
    }
]
```
All of the heavy lifting is done in src/components/videoPlayer.jsx. A sample container can be found in src/containers.
You could use this to connect to a Redux store or pass props down by hand.
A working React example can be found in the example directory. To build the example, run `npm run build:example`. To run the example with Webpack watch mode,
run `npm run watch:example`.
## Available Props
```
SRC - URL to streaming file
MIME type - MIME type of streaming file
VideoJS Player Options - object literal containing config options for VideoJS player instance
Plugins - array of VideoJS plugins stored as object literals
Store - option to connect to Redux Store
```
## License

MIT. Copyright (c) jjromphf &lt;jromphf@library.rochester.edu&gt;


[videojs]: http://videojs.com/
[react]: https://facebook.github.io/react/
