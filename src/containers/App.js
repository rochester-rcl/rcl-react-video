/* @flow */

// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import * as AppActionCreators from "../actions/actions";

// Video Container
import VideoContainer from "./VideoContainer";

// Semantic UI
import { Icon } from "semantic-ui-react";

// CSS
import "semantic-ui-css/semantic.css";
import "../css/index.css";
// plugins
import NLEControls from "../vjs-plugins/NLEControls";

const sources = {
  mediaFiles: [
    {
      src:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      type: "video/mp4",
      framerate: 24,
    }
  ],
  duration: 500
};

const plugins = [
  {
    plugin: NLEControls,
    name: "NLEControls",
    options: {
      framerate: sources.mediaFiles[0].framerate,
      smpteTimecode: true,
      frameControls: true,

    }
  }
];

// VJS Options
const playerOptions = {
  controls: true,
  inactivityTimeout: false,
  fluid: true
};

class App extends Component {
  componentDidMount() {
    // Call this here to load initial data
    this.props.loadAPIDataAction();
  }
  render() {
    const { children, data } = this.props;
    return (
      <div className="app-root-container">
        <VideoContainer
          src={sources.mediaFiles}
          playerOptions={playerOptions}
          plugins={plugins}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Do sorting here
  return {
    data: state.data
  };
}

function mapActionCreatorsToProps(dispatch: Object) {
  return bindActionCreators(AppActionCreators, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(App);
