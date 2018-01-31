/**
* Function to convert milliseconds to SMPTE (HH:MM:SS:FF) timecode
*
*@function toSMPTE
*@param {number} currentTime
*@param {number} framerate
*/

// currentTime must be in seconds
export const toSMPTE = function(currentTime: number, framerate: number) {
  let currentFrame: number = parseInt(currentTime * framerate, 10);
  let hours: number = Math.floor(currentTime / 3600);
  let minutes: number = Math.floor(currentTime / 60);
  let seconds: number = parseInt(currentTime - (hours * 3600) - (minutes * 60));
  let frames: number = parseInt(currentFrame % framerate);

  let timecodeArray: Array<number> = [hours, minutes, seconds, frames];
  let processedTimecodeArray: Array<string> = [];

  timecodeArray.forEach((time: number) => {
    if(time < 10){
      let timeString: string = "0" + time;
      processedTimecodeArray.push(timeString);
    } else {
      let timeString: string = time.toString();
      processedTimecodeArray.push(timeString);
    }
  });
  return(processedTimecodeArray.join(':'));
}

/**
* Function to convert current time (seconds) to milliseconds
*
*@function toMS
*@param {number} currentTimeInSeconds
*/
export const toMS = function(currentTimeInSeconds: number) {
    return Math.ceil(currentTimeInSeconds * 1000);
}

/**
* Function to convert current time (milliseconds) to seconds
*
*@function msToSeconds
*@param {number} currentTimeInMilliseconds
*/
export const toSeconds = function(currentTimeInMilliseconds: number) {
    return (currentTimeInMilliseconds / 1000);
}

/**
* Function to convert current frame number to seconds
*
*@function frameToSeconds
*@param {number} frame
*@param {number} framerate
*/
export const frameToSeconds = function(frame: number, framerate: number) {
    return (frame / framerate);
}

/**
* Function to convert seconds to frame number
*
*@function secondsToFrames
*@param {number} seconds
*@param {number} framerate
*/
export const secondsToFrames = function(seconds: number, framerate: number) {
    return parseInt(seconds * framerate);
}
