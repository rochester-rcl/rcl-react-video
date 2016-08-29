/* @flow */

// React
import React, { Component, PropTypes } from 'react';

// Containers
import VideoPlayer from '../components/videoPlayer';

class VideoContainer extends Component {
  constructor(props: Object) {
    super(props);
  }
  render(){
    const { fileUrl, mime, playerOptions, plugins } = this.props;
    return(
      <VideoPlayer src={fileUrl} mime={mime} playerOptions={playerOptions} plugins={plugins}/>
    );
  }
}

VideoContainer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  mime: PropTypes.string.isRequired,
  playerOptions: PropTypes.object,
  plugins: PropTypes.array,
  store: PropTypes.object // option to connect to store or take props in index (must be wrapped in <Provider/>)
}

// Connect to redux store

export default VideoContainer
