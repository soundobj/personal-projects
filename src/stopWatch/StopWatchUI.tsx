import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { stopWatch, CallbackPayload } from './stopWatch'
import './StopWatchUI.css'

interface Props {
  onPause: (payload: boolean) => void
  shouldClear: boolean,
  onClear: (timeElapsed: CallbackPayload) => void
}

const watch = stopWatch()

const StopWatchUI = (props: Props) => {
  const initialTimeElapsed = {
    elapsedTime: 0,
    ISOString: "00:00:00",
  }

  const { shouldClear, onClear, onPause } = props
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  if (shouldClear) {
    onClear(timeElapsed)
    watch.clear();
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