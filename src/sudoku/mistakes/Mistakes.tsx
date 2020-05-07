import React from "react";
import { ALLOWED_MISTAKES } from "../definitions";
import { GrAlert } from "react-icons/gr";
import Icon from "../icon/Icon";

import "./Mistakes.css"

interface Props {
  mistakes: number;
}

const Mistakes = (props: Props) => {
  const { mistakes } = props;
  return (
    <div className="sudoku__mistakes">
      <Icon title="Mistakes">
        <GrAlert />
      </Icon>
      <span>{mistakes} / {ALLOWED_MISTAKES}</span>
    </div>
  );
};

export default Mistakes;
