import React from "react";
// @ts-ignore
import classnames from "classnames";
import { ALLOWED_MISTAKES } from "../lib/definitions";
import { ReactComponent as Shape } from "../../assets/empty-shape.svg";
import "./Mistakes.scss";

interface Props {
  mistakes: number;
}

const MistakesSeverity = ["OK", "MILD", "MEDIUM", "WARNING"];

const Mistakes = (props: Props) => {
  const { mistakes } = props;
  return (
    <article className="mistakes">
      <figure className={classnames("mistakes__icon", MistakesSeverity[mistakes])}>
        <Shape />
        <h5 className="mistakes__content">
          {mistakes}/{ALLOWED_MISTAKES}
        </h5>
      </figure>
      <figcaption className="mistakes__footer">fails</figcaption>
    </article>
  );
};

export default Mistakes;
