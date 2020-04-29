import React from "react";
import { Button } from "react-bootstrap";

import { GameLevel } from "../definitions";

export interface Props {
  onHide: () => void;
  onNewGame: (gameLevel?: string) => void;
}

const NewGameOptions = (props: Props) => {
  const { onHide, onNewGame } = props;
  return (
    <ul>
      {Object.keys(GameLevel).map((item: string) => {
        return (
          <li>
            <Button
              key={`gameLevelOption-${item}`}
              className="gameLevel__options"
              onClick={() => {
                onHide();
                onNewGame(item);
              }}
            >
              {item}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default NewGameOptions;
