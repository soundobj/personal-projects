import React from "react";

import { ReactComponent as Easy } from '../../assets/easy.svg';
import { ReactComponent as Medium } from '../../assets/medium.svg';
import { ReactComponent as Hard } from '../../assets/hard.svg';
import { ReactComponent as Expert } from '../../assets/expert.svg';

import { GameLevel } from "../lib/definitions";
import "./NewGameOptions.scss"

export interface Props {
  onHide: () => void;
  onNewGame: (gameLevel?: string) => void;
}
const icons = [<Easy />, <Medium />, <Hard />, <Expert />];

const NewGameOptions = (props: Props) => {
  const { onHide, onNewGame } = props;
  return (
    <ul className="gameLevel">
      {Object.keys(GameLevel).map((item: string, index: number) => {
        return (
          <li key={`game-option-${item}`}>
            <button
              className="gameLevel__option"
              onClick={() => {
                onHide();
                onNewGame(item);
              }}
            >
              {/* Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
              <div className="gameLevel__option__icon">{icons[index]}</div>
              <div className="gameLevel__option__text"><h1>{item}</h1></div> 
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default NewGameOptions;
