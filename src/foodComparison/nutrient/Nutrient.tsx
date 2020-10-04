import React from "react";

import "../css/tools.scss";
import "./Nutrient.scss";

interface Props {}

const Nutrient = (props: Props) => {
  return (
    <article>
      <span className="nutrient__name">Iron</span>
      <ul className="chart">
        <li>
          <span className="bar" style={{ height: "35%" }} title=""></span>
        </li>
        <li>
          <span className="bar" style={{ height: "70%" }} title=""></span>
        </li>
      </ul>
    </article>
  );
};

export default Nutrient;
