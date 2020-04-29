import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { StopWatch, initialTimeElapsed } from './stopWatch'
import './StopWatchUI.css'

interface Props {
  watch: StopWatch
  onPause: (payload: boolean) => void
}

const StopWatchUI = (props: Props) => {
  const { watch, onPause } = props
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  const [isPaused, setisPaused] = useState(false)
  watch.setCallback(setTimeElapsed)

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