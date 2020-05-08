import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GiStopwatch } from "react-icons/gi";
import { GrPause } from "react-icons/gr";
import { GrResume } from "react-icons/gr";
import Icon from "../sudoku/icon/Icon";
import { StopWatch, initialTimeElapsed } from "./stopWatch";
import "./StopWatchUI.scss";

interface Props {
  watch: StopWatch;
  onPause: (payload: boolean) => void;
  isGamePlayed: boolean;
}

const StopWatchUI = (props: Props) => {
  const { watch, onPause, isGamePlayed } = props;
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  const [isPaused, setisPaused] = useState(false);
  watch.setCallback(setTimeElapsed);

  return (
    <div className="stopWatch">
      <Icon
        disabled={!isGamePlayed}
        title={isPaused ? "Resume" : "Pause"}
        onClick={() => {
          setisPaused(!isPaused);
          if (isPaused) {
            watch.start();
            onPause(false);
          } else {
            watch.stop();
            onPause(true);
          }
        }}
      >
        {isPaused ? <GrResume /> : <GrPause />}
      </Icon>
      <h5 className="stopWatch__timeElapsed">{timeElapsed.ISOString}</h5>
    </div>
  );
};

export default StopWatchUI;
