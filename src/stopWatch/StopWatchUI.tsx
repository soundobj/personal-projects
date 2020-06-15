import React, { useState, useEffect } from "react";
import { GrPause } from "react-icons/gr";
import { GrResume } from "react-icons/gr";
import { StopWatch } from "./stopWatch";
import "./StopWatchUI.scss";

interface Props {
  watch: StopWatch;
  onPause: (payload: boolean) => void;
  isGamePlayed: boolean;
  isGamePaused: boolean;
}

const StopWatchUI = (props: Props) => {
  const { watch, onPause, isGamePlayed, isGamePaused } = props;
  let [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);

  const onClick = () => {
    if (isGamePaused) {
      watch.start();
      onPause(false);
    } else {
      watch.stop();
      onPause(true);
    }
  }

  useEffect(() => {
    setTimeElapsed(watch.getElapsedTime());
  }, [isGamePlayed]);

  return (
    <button className="stopWatch" onClick={onClick} disabled={!isGamePlayed}>
      <div className="stopWatch__icon__container">
        {isGamePaused ? <GrResume /> : <GrPause />}
      </div>
      <div className="stopWatch__timeElapsed">
        {timeElapsed.ISOString.split("").map((digit: string, index: number) => (
          <span
            className={
              digit === ":"
                ? "stopWatch__timeElapsed__delimiter"
                : "stopWatch__timeElapsed__digit"
            }
            key={`digit${index}`}
          >
            {digit}
          </span>
        ))}
      </div>
    </button>
  );
};

export default StopWatchUI;
