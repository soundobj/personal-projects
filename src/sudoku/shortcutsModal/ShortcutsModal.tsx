import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

import "./ShortcutsModal.scss";

interface Props {
  description: string;
  shortcut: string | JSX.Element;
}

const MoveControls = () => (
  <article className="sudoku__shortcuts__move">
    <span className="sudoku__shortcuts__move__left">
      <AiFillCaretLeft />
    </span>
    <div className="sudoku__shortcuts__move__up-down">
      <span className="sudoku__shortcuts__move__up">
        <AiFillCaretUp />
      </span>
      <span className="sudoku__shortcuts__move__down">
        <AiFillCaretDown />
      </span>
    </div>
    <span className="sudoku__shortcuts__move__right">
      <AiFillCaretRight />
    </span>
  </article>
);

const shortcuts: Props[] = [
  { description: "Undo last Move", shortcut:"u" },
  { description: "Pause game", shortcut: "space" },
  { description: "Toggle candidate mode", shortcut: "c" },
  { description: "Navigation", shortcut: <MoveControls /> },
];

const Item = (props: Props) => {
  const { description, shortcut } = props;
  return (
    <figure className="sudoku__shortcuts__item">
      <figcaption className="sudoku__shortcuts__item__description">{description}</figcaption>
      {shortcut}
    </figure>
  );
};

const ShorCutsModal = () => {
  return <article className="sudoku__sudoku__shortcuts">
      <Item {...shortcuts[3]} />
    </article>;
};

export default ShorCutsModal;
