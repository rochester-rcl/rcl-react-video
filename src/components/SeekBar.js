/* @flow */

// React
import React, { Component } from "react";

import videojs from "video.js";

// utils
import { toSMPTE } from '../utils/timecodes';

export default class MediateSeekBar extends Component {
  seekBar: videojs.SeekBar;
  seekBarCanvas: HTMLCanvasElement;
  _offscreenCanvas: HTMLCanvasElement;
  _offscreenContext: CanvasRenderingContext2D;
  _onscreenContext: CanvasRenderingContext2D;
  SEEKBAR_ASPECT: number = 8;
  // update on window resize
  state = {
    canvas: {
      width: 0,
      height: 0
    },
    seekX: 0,
    dragging: false,
    timeMarkers: [],
  };

  constructor(props: Object) {
    super(props);
    (this: any).initSeekbar = this.initSeekbar.bind(this);
    (this: any).getTimeMarkers = this.getTimeMarkers.bind(this);
    (this: any).drawPositionIndicator = this.drawPositionIndicator;
    (this: any).loadBackgroundImage = this.loadBackgroundImage.bind(this);
    (this: any).drawBackgroundImage = this.drawBackgroundImage.bind(this);
    (this: any).animate = this.animate.bind(this);
    (this: any).handleWindowResize = this.handleWindowResize.bind(this);
    (this: any).handleTimeUpdate = this.handleTimeUpdate.bind(this);
    (this: any).resize = this.resize.bind(this);
    (this: any).handleDrag = this.handleDrag.bind(this);
    (this: any).toggleDrag = this.toggleDrag.bind(this);
    (this: any).clear = this.clear.bind(this);
    (this: any).seekToDuration = this.seekToDuration.bind(this);
    (this: any).durationToSeek = this.durationToSeek.bind(this);
  }

  componentDidMount(): void {
    this.props.player.on("loadedmetadata", () => {
      this.initSeekbar();
    });
    this.props.player.on("timeupdate", this.handleTimeUpdate);
    window.addEventListener("resize", this.handleWindowResize);
    // may not need an actual SeekBar
    //this.seekBar = new SeekBarComponent(this.props.player, {});
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  clear(): void {
    let { width, height } = this.state.canvas;
    this._offscreenContext.clearRect(0, 0, width, height);
    this._onscreenContext.clearRect(0, 0, width, height);
  }

  animate(): void {
    this.clear();
    this._onscreenContext.drawImage(this._offscreenCanvasBackground, 0, 0);
    this.drawPositionIndicator();
    this._onscreenContext.drawImage(this._offscreenCanvas, 0, 0);
    requestAnimationFrame(this.animate);
  }

  durationToSeek(currentTime: number): number {
    let { width } = this.state.canvas;
    let duration = this.props.player.duration();
    return currentTime * width / duration;
  }

  seekToDuration(seekPos: number): number {
    let { width } = this.state.canvas;
    let duration = this.props.player.duration();
    return seekPos * duration / width;
  }

  drawPositionIndicator(): void {
    let { seekX } = this.state;
    let ctx = this._offscreenContext;
    ctx.strokeStyle = "#ccc";
    let gr = ctx.createLinearGradient(0, 0, 0, 40);
    gr.addColorStop(0, "rgba(127,127,127, 1.0)");
    gr.addColorStop(1, "rgba(0,0,0,0.0)");
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.fillStyle = gr;
    ctx.moveTo(seekX, 2);
    ctx.lineTo(seekX + 10, 2);
    ctx.lineTo(seekX + 10, 12);
    ctx.lineTo(seekX + 5, 22);
    ctx.lineTo(seekX, 12);
    ctx.lineTo(seekX, 2);
    ctx.moveTo(seekX + 5, 22);

    ctx.lineTo(seekX + 5, this._offscreenCanvas.height);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  loadBackgroundImage(): void {
    let { url, width, height } = this.props.seekBarImage;
    this.backgroundImage = new Image(width, height);
    this.backgroundImage.src = url;
    this.backgroundImage.onload = () => {
      this.drawBackgroundImage();
    };
  }

  drawBackgroundImage(): void {
    let { width, height } = this.seekBarCanvas;
    let ctx = this._offscreenContextBackground;
    let { timeMarkers } = this.state;
    ctx.fillStyle = '#ccc';
    ctx.strokeStyle = '#444';
    let step = width / 7;
    let x = step;
    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.closePath;
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 20)
    ctx.stroke();
    ctx.closePath();
    let marker = "00:00:00:00";
    ctx.fillText(marker, 10, 20);
    for (let i = 0; i < timeMarkers.length; i++, x+=step) {
      ctx.beginPath()
      ctx.moveTo(x+5, 0);
      ctx.lineTo(x+5, 20)
      ctx.stroke();
      ctx.closePath();
      let marker = timeMarkers[i];
      ctx.fillText(marker, x+10, 20);
    }
    ctx.drawImage(
      this.backgroundImage,
      0,
      height / 2,
      width,
      height
    );
  }

  handleWindowResize(event: Event): void {
    let { clientWidth, clientHeight } = this.seekBarCanvas;
    this.resize(clientWidth, clientHeight);
  }

  handleTimeUpdate(): void {
    let time = this.props.player.currentTime();
    if (!this.state.dragging) {
      this.setState({
        seekX: this.durationToSeek(time)
      });
    }
  }

  resize(width: number, height: number): void {
    this.setState(
      {
        canvas: {
          width: width,
          height: height
        }
      },
      () => {
        let { width, height } = this.state.canvas;
        this._offscreenCanvas.width = width;
        this._offscreenCanvas.height = height;
        this._offscreenCanvasBackground.width = width;
        this._offscreenCanvasBackground.height = height;
        this.seekBarCanvas.width = width;
        this.seekBarCanvas.height = height;
        if (this.backgroundImage) {
          this.drawBackgroundImage();
        }
      }
    );
  }

  toggleDrag(val: boolean): void {
    this.setState({
      dragging: val
    });
    if (!val) {
      this.props.player.currentTime(this.seekToDuration(this.state.seekX));
    }
  }

  handleDrag(event: SyntheticEvent): void {
    if (this.state.dragging) {
      event.preventDefault();
      event.stopPropagation();
      let rect = this.seekBarCanvas.getBoundingClientRect();
      let xScale = this.seekBarCanvas.width / rect.width;
      let mouseX = (event.clientX - rect.left) * xScale;
      let seekVal = mouseX;
      if (mouseX >= this.seekBarCanvas.width - 10)
        seekVal = this.seekBarCanvas.width - 10;
      if (mouseX < 0) seekVal = 0;
      this.setState({ seekX: seekVal });
    }
  }

  getTimeMarkers(): Array<string> {
    let timeMarkers = [];
    let duration = this.props.player.duration();
    for (let i = duration/7; i < duration; i+=duration/7) {
      timeMarkers.push(toSMPTE(i, this.props.playerInfo.framerate));
    }
    return timeMarkers;
  }

  initSeekbar(): void {
    const { width, height, clientWidth, clientHeight } = this.seekBarCanvas;
    this._offscreenCanvasBackground = document.createElement("canvas");
    this._offscreenCanvas = document.createElement("canvas");
    this.resize(clientWidth, clientWidth / this.SEEKBAR_ASPECT);
    this._offscreenContext = this._offscreenCanvas.getContext("2d");
    this._offscreenContextBackground = this._offscreenCanvasBackground.getContext(
      "2d"
    );
    this._onscreenContext = this.seekBarCanvas.getContext("2d");
    this.setState({ timeMarkers: this.getTimeMarkers()
    }, () => {;
      this.loadBackgroundImage();
      this.animate();
    });
  }

  render() {
    const { player, playerInfo } = this.props;
    return (
      <div
        draggable={false}
        className="mediate-player-seekbar-container"
        onMouseDown={() => this.toggleDrag(true)}
        onMouseMove={this.handleDrag}
        onMouseUp={() => this.toggleDrag(false)}
      >
        <canvas
          draggable={false}
          ref={ref => (this.seekBarCanvas = ref)}
          className="mediate-player-seekbar-canvas"
        />
      </div>
    );
  }
}
