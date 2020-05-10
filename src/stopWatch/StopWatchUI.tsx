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

  return (
    <div className="stopWatch">
      <Icon
        disabled={!isGamePlayed}
        title={isGamePaused ? "Resume" : "Pause"}
        onClick={() => {
          if (isGamePaused) {
            watch.start();
            onPause(false);
          } else {
            watch.stop();
            onPause(true);
          }
        }}
      >
        {isGamePaused ? <GrResume /> : <GrPause />}
      </Icon>
      <h5 className="stopWatch__timeElapsed">{timeElapsed.ISOString}</h5>
    </div>
  );
};

export default StopWatchUI;
