/* @flow */

// Babel
import "babel-polyfill";

// React
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

// Containers
import VideoContainer from './containers/videoContainer';

// VJS Plugins
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

ReactDOM.render(
  <VideoContainer fileUrl={'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov'} mime={'video/webm'} plugins={plugins}/>, // These props could also be received from a Redux store - just set the store up here
  document.getElementById('test')
);
