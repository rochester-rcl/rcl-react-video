'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _videoPlayer = require('../components/videoPlayer');

var _videoPlayer2 = _interopRequireDefault(_videoPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React


// Containers


var VideoContainer = function (_Component) {
  _inherits(VideoContainer, _Component);

  function VideoContainer(props) {
    _classCallCheck(this, VideoContainer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoContainer).call(this, props));
  }

  _createClass(VideoContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var fileUrl = _props.fileUrl;
      var mime = _props.mime;
      var playerOptions = _props.playerOptions;
      var plugins = _props.plugins;

      return _react2.default.createElement(_videoPlayer2.default, { src: fileUrl, mime: mime, playerOptions: { "controls": true }, plugins: plugins });
    }
  }]);

  return VideoContainer;
}(_react.Component);

VideoContainer.propTypes = {
  fileUrl: _react.PropTypes.string.isRequired,
  mime: _react.PropTypes.string.isRequired,
  playerOptions: _react.PropTypes.object,
  plugins: _react.PropTypes.array,
  store: _react.PropTypes.object // option to connect to store or take props in index (must be wrapped in <Provider/>)
};

// Connect to redux store

exports.default = VideoContainer;