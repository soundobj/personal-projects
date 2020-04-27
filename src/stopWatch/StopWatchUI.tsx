import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { stopWatch, CallbackPayload } from './stopWatch'
import './StopWatchUI.css'

interface Props {
  onPause: (payload: boolean) => void
  shouldClear: boolean,
  onClear: (timeElapsed: CallbackPayload) => void
  shouldStart: boolean,
}

const watch = stopWatch()

const StopWatchUI = (props: Props) => {
  const initialTimeElapsed = {
    elapsedTime: 0,
    ISOString: "00:00:00",
  }

  const { shouldClear, onClear, onPause, shouldStart } = props
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  /* 
    this boolean allows to start() or clear() the timer once only
    until the watch is paused, the game ended or restarted, acting as a toggle between
    finished games and new games
  */
  const [hasCleared, setHasCleared] = useState(false);

  if(shouldStart && hasCleared) {
    setTimeElapsed(initialTimeElapsed)
    watch.start()
    setHasCleared(false)
  }

  if (shouldClear && !hasCleared) {
    onClear(timeElapsed)
    watch.clear();
    setHasCleared(true)
  }
  const [isPaused, setisPaused] = useState(false)

  useEffect(() => {
    watch.setCallback(setTimeElapsed)
    watch.start();
  }, []);

  return (    
    <>
      <div className="stopWatchUI">{timeElapsed.ISOString}</div>
      { <Button
        onClick={() => {
          setisPaused(!isPaused)
          if (isPaused) { 
            watch.start()
            onPause(false)
          } else { 
            watch.stop();
            onPause(true)
          }
        }}
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
      }
    </>
  );
};

export default StopWatchUI;