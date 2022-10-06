export interface StopWatch {
  start: () => void
  stop: () => void
  clear: () => void
  getElapsedSeconds: () => number
  printElapsedTime: () => string
  setCallback: (c:(c:any)=> void) => void
  getElapsedTime: () => StopWatchCallbackPayload
  setElapsedSeconds: (milliseconds: number) => void
  getIsRunning: () => boolean
  setIntervalLength: (internal: number) => void
}

export interface StopWatchCallbackPayload {
  elapsedTime: number,
  ISOString: string
}

export const initialTimeElapsed = {
  elapsedTime: 0,
  ISOString: "0:00:00",
}

/*
  Supply a callback to stoWatch to be notified with CallbackPayload every time the stopWatch ticks
*/
export const stopWatch = (interval: number = 1000): StopWatch => {
  let elapsedTime = 0;
  let timer: NodeJS.Timeout;
  let callback: (c:any) => void;
  let isRunning: boolean = false;
  let _interval = interval;

  function add() {
    elapsedTime++;
    callback({
      elapsedTime: elapsedTime * _interval,
      ISOString: printElapsedTime(),
    });
  }

  const clear = () => {
    elapsedTime = 0;
    isRunning = false
    clearInterval(timer);
  };

  const start = () => {
    if (isRunning) {
      console.error('@_StopWatch is already running, cannot start!');
      return
    }
    timer = setInterval(add, _interval);
    isRunning = true
  }

  const stop = () => {
    clearInterval(timer);
    isRunning = false;
  };
  const getElapsedSeconds = () => elapsedTime * _interval;
  const printElapsedTime = () => {
    const timeEllapsed = new Date(elapsedTime * _interval).toISOString()
    return timeEllapsed.substr(12, 7);
  }
  const getElapsedTime = () => ({
    elapsedTime: elapsedTime * _interval,
    ISOString: printElapsedTime(),
  });
  
  const setCallback = (c:(c:any) => void) => callback = c

  const setIntervalLength = (interval: number) => {
    _interval = interval;
    clearInterval(timer);
    timer = setInterval(add, _interval);
  };

  const getIsRunning = () => {
    return isRunning
  }

  const setElapsedSeconds = (milliseconds: number) => elapsedTime = milliseconds / _interval

  return {
    start,
    stop,
    clear,
    getElapsedSeconds,
    printElapsedTime,
    setCallback,
    getElapsedTime,
    setElapsedSeconds,
    getIsRunning,
    setIntervalLength,
  };
};

export default stopWatch
