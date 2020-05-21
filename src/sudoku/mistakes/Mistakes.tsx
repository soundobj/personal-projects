import React from "react";
// @ts-ignore
import classnames from "classnames";
import { ALLOWED_MISTAKES } from "../lib/definitions";
import { ReactComponent as Shape } from "../../assets/empty-shape.svg";
import "./Mistakes.scss";

interface Props {
  mistakes: number;
}

export const MistakesTypes = ["OK", "MILD", "MEDIUM", "WARNING"];

const Mistakes = (props: Props) => {
  const { mistakes } = props;
  return (
    <div className="mistakes">
      <div className={classnames("mistakes__icon", MistakesTypes[mistakes])}>
        <Shape />
        <div className="mistakes__icon__content">
          <span className="mistakes__number">{mistakes}</span>
          <span className="mistakes__delimiter">/</span>
          <span className="mistakes__total">{ALLOWED_MISTAKES}</span>
        </div>
      </div>
      <span className="mistakes__footer">fails</span>
    </div>
  );
};

export default Mistakes;
