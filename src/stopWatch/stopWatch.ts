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
export const stopWatch = (): StopWatch => {
  let elapsedTime = 0;
  let timer: NodeJS.Timeout
  let callback: (c:any) => void
  let isRunning: boolean = false

  function add() {
    elapsedTime++;
    callback({
      elapsedTime: elapsedTime * 1000,
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
    timer = setInterval(add, 1000); // one second
    isRunning = true
  }

  const stop = () => {
    clearInterval(timer);
    isRunning = false;
  };
  const getElapsedSeconds = () => elapsedTime * 1000;
  const printElapsedTime = () => {
    const timeEllpased = new Date(elapsedTime * 1000).toISOString()
    return timeEllpased.substr(12, 7);
  }
  const getElapsedTime = () => ({
    elapsedTime: elapsedTime * 1000,
    ISOString: printElapsedTime(),
  });
  
  const setCallback = (c:(c:any) => void) => callback = c

  const getIsRunning = () => {
    return isRunning
  }

  const setElapsedSeconds = (milliseconds: number) => elapsedTime = milliseconds / 1000

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
  };
};

export default stopWatch
