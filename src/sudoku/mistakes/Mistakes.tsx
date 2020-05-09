import React from "react";
import { ALLOWED_MISTAKES } from "../lib/definitions";
import "./Mistakes.scss";

interface Props {
  mistakes: number;
}

export const MistakesTypes = ["OK", "MILD", "MEDIUM", "WARNING"];

const Mistakes = (props: Props) => {
  const { mistakes } = props;
  return (
    <div>
      <span className="mistakes__number">{mistakes}</span>
      <span className="mistakes__delimiter">/</span>
      <span className="mistake__total">{ALLOWED_MISTAKES}</span>
    </div>
  );
};

export default Mistakes;
