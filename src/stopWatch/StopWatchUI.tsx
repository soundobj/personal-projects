import React, { useState } from "react";
import { GrPause } from "react-icons/gr";
import { GrResume } from "react-icons/gr";
import Icon from "../sudoku/icon/Icon";
import { StopWatch, initialTimeElapsed } from "./stopWatch";
import "./StopWatchUI.scss";

interface Props {
  watch: StopWatch;
  onPause: (payload: boolean) => void;
  isGamePlayed: boolean;
  isGamePaused: boolean;
}

const StopWatchUI = (props: Props) => {
  const { watch, onPause, isGamePlayed, isGamePaused } = props;
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  watch.setCallback(setTimeElapsed);
  // const timeElapsed = {
  //   ISOString: '0:00:00'
  // }

  const onClick = () => {
    if (isGamePaused) {
      watch.start();
      onPause(false);
    } else {
      watch.stop();
      onPause(true);
    }
  }

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
