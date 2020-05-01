import React from "react";
import { ALLOWED_MISTAKES } from "../definitions";

interface Props {
  mistakes: number
}

const Mistakes = (props: Props) => {
  const { mistakes } = props
  return (
    <div className="sudoku__mistakes">Mistakes: {mistakes} / {ALLOWED_MISTAKES}</div>
  )
}

export default Mistakes