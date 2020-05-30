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

const SkipCompletedMoveControls = () => (
  <div className="sudoku__shortcuts__move__skip__completed">
    <span className="sudoku__shortcuts__key">option</span>
    <span className="sudoku__shortcuts__plus">+</span>
    <MoveControls />
  </div>
);

interface KeyProps {
  value: string;
}

const Key = (props: KeyProps) => (
  <span className="sudoku__shortcuts__key">{props.value}</span>
);

const shortcuts: Props[] = [
  { description: "Pause / Restart game", shortcut: <Key value="space" /> },
  { description: "Toggle candidate mode", shortcut: <Key value="c" /> },
  { description: "Undo last Move", shortcut: <Key value="u" /> },
  { description: "Navigation", shortcut: <MoveControls /> },
  {
    description: "Navigation skip completed",
    shortcut: <SkipCompletedMoveControls />,
  },
];

const Item = (props: Props) => {
  const { description, shortcut } = props;
  return (
    <figure className="sudoku__shortcuts__item">
      <figcaption className="sudoku__shortcuts__item__description">
        {description}
      </figcaption>
      {shortcut}
    </figure>
  );
};

const ShorCutsModal = () => (
  <article className="sudoku__sudoku__shortcuts">
    {shortcuts.map((item: Props, index: number) => (
      <Item key={`shortcut-${index}`} {...item} />
    ))}
  </article>
);

export default ShorCutsModal;
