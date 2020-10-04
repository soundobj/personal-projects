import React from "react";

import "../css/tools.scss";
import "./Nutrient.scss";

interface Props {}

const Nutrient = (props: Props) => {
  return (
    <article>
      <ul className="chart">
        <li>
          <span style={{ height: "35%" }} title=""></span>
          <span>ActionScript</span>
        </li>
        <li>
          <span style={{ height: "70%" }} title=""></span>
          <span>Javascript</span>
        </li>
      </ul>
    </article>
  );
};

export default Nutrient;
