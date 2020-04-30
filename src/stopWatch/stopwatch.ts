export interface StopWatch {
  start: () => void
  stop: () => void
  clear: () => void
  getElapsedSeconds: () => number
  printElapsedTime: () => string
  setCallback: (c:(c:any)=> void) => void
  getElapsedTime: () => StopWatchCallbackPayload
}

export interface StopWatchCallbackPayload {
  elapsedTime: number,
  ISOString: string
}

export const initialTimeElapsed = {
  elapsedTime: 0,
  ISOString: "00:00:00",
}

/*
  Supply a callback to stoWatch to be notified with CallbackPayload every time the stopWatch ticks
*/
export const stopWatch = (): StopWatch => {
  let elapsedTime = 0;
  let timer: NodeJS.Timeout
  let callback: (c:any) => void

  function add() {
    elapsedTime++;
    callback({
      elapsedTime: elapsedTime * 1000,
      ISOString: printElapsedTime(),
    });
  }

  const clear = () => {
    elapsedTime = 0;
    clearInterval(timer);
  };

  const start = () => {
    timer = setInterval(add, 1000); // one second
  }

  const stop = () => clearInterval(timer);
  const getElapsedSeconds = () => elapsedTime * 1000;
  const printElapsedTime = () => new Date(elapsedTime * 1000).toISOString().substr(11, 8);
  const getElapsedTime = () => ({
    elapsedTime: elapsedTime * 1000,
    ISOString: printElapsedTime(),
  });
  const setCallback = (c:(c:any) => void) => callback = c

  return {
    start,
    stop,
    clear,
    getElapsedSeconds,
    printElapsedTime,
    setCallback,
    getElapsedTime,
  };
};

export default stopWatch