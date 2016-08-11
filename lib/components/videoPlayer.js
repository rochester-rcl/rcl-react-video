'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// React


// VideoJS


var VideoPlayer = function (_Component) {
    _inherits(VideoPlayer, _Component);

    function VideoPlayer(props) {
        _classCallCheck(this, VideoPlayer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoPlayer).call(this, props));
    }

    // Lifecycle methods


    _createClass(VideoPlayer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initPlayer();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var currentSrc = this.props.src;
            var newSrc = nextProps.src;
            if (currentSrc !== newSrc) {
                this.setSrc(newSrc);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.player.dispose();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'video',
                {ref: 'videoJSPlayer', className: 'video-js vjs-default-skin vjs-big-play-centered'},
                this.props.children
            );
        }
        // Player related methods

    }, {
        key: 'initPlayer',
        value: function initPlayer() {
            var src = this.props.src;
            var options = this.props.playerOptions;
            this.player = (0, _video2.default)(this.getPlayerElement(), options);
            this.player.src(src);
            this.registerPlugins();
        }
        // Assuming all videojs plugins are written according to https://github.com/videojs/video.js/blob/master/docs/guides/plugins.md

    }, {
        key: 'registerPlugins',
        value: function registerPlugins() {
            var _this2 = this;

            var plugins = this.props.plugins;
            plugins.forEach(function (pluginObj) {
                _video2.default.plugin(pluginObj.name, pluginObj.plugin);
                _this2.player[pluginObj.name] = pluginObj.plugin.call(_this2.player, pluginObj.options);
            });
        }
    }, {
        key: 'getPlayerElement',
        value: function getPlayerElement() {
            return this.refs.videoJSPlayer;
        }
    }, {
        key: 'setSrc',
        value: function setSrc(src) {
            this.player.src = src;
        }
    }]);

    return VideoPlayer;
}(_react.Component);

exports.default = VideoPlayer;


VideoPlayer.propTypes = {
    src: _react.PropTypes.string.isRequired,
    playerOptions: _react.PropTypes.object,
    plugins: _react.PropTypes.array
};