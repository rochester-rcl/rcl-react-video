# YARV

Yet Another React Video Component

<!-- START doctoc -->
<!-- END doctoc -->
## Installation and Usage

Clone this repo and `import VideoContainer from './containers/videoContainer';` into your js entry point.

import any VideoJS plugins into your js entry point and add them to the plugins array. Configure your plugins as object literals:
```
import nleControls  from './plugins/videojs-nle-controls.min';

let plugins = [
                { plugin: nleControls,
                  name: 'nleControls',
                  options: { framerate: 24.0,
                             smpteTimecode: true,
                             frameControls: true
                  }
                }
              ]
```
## Available Props
```File URL - URL to streaming file
MIME type - MIME type of streaming file
VideoJS Player Options - object literal containing config options for VideoJS player instance
Plugins - array of VideoJS plugins stored as object literals
Store - option to connect to Redux Store
```
## License

MIT. Copyright (c) jjromphf &lt;jromphf@library.rochester.edu&gt;


[videojs]: http://videojs.com/
[react]: https://facebook.github.io/react/
