export interface StopWatch {
  start: () => void
  stop: () => void
  clear: () => void
  getElapsedSeconds: () => number
  printElapsedTime: () => string
}

interface CallbackPayload {
  elapsedTime: number,
  ISOString: string
}

/*
  Supply a callback to stoWatch to be notified with CallbackPayload every time the stopWatch ticks
*/
export const stopWatch = (
  callback: (payload: CallbackPayload) => CallbackPayload
): StopWatch => {
  let elapsedTime = 0;
  let t: any;

  function timer() {
    t = setTimeout(add, 1000); // one second
  }
  function add() {
    elapsedTime++;
    timer();
    // TODO: check the output of the callback in the test and use the callback in a useState() hook to update the UI every second.
    callback({
      elapsedTime: elapsedTime * 1000,
      ISOString: printElapsedTime(),
    });
  }

  const clear = () => {
    elapsedTime = 0;
    clearTimeout(t);
  };

  const start = () => timer();
  const stop = () => clearTimeout(t);
  const getElapsedSeconds = () => elapsedTime * 1000;
  const printElapsedTime = () => new Date(elapsedTime * 1000).toISOString().substr(11, 8);

  return {
    start,
    stop,
    clear,
    getElapsedSeconds,
    printElapsedTime,
  };
};