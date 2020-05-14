import React from "react";
import NewGameOptions, {
  Props as NewGameOptionsProps,
} from "../newGameOptions/NewGameOptions";
import { StopWatchCallbackPayload } from "../../stopWatch/stopWatch";
import { GiMedallist } from "react-icons/gi";
import { GiStrong } from "react-icons/gi";

interface Props extends NewGameOptionsProps {
  finishedTime: StopWatchCallbackPayload;
}

const GameCompletedModal = (props: Props) => {
  const { onHide, onNewGame, finishedTime } = props;
  return (
    <>
      <p>Congratulations!!</p>
      <GiMedallist />
      <GiStrong />
      <p>Time to complete: {finishedTime.ISOString}</p>
      <p>Start a new Game</p>
      <NewGameOptions onHide={onHide} onNewGame={onNewGame} />
    </>
  );
};

export default GameCompletedModal;