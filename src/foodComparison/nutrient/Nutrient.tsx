import React from "react";

import "../css/tools.scss";
import "./Nutrient.scss";

interface Props {}

const Nutrient = (props: Props) => {
  return (
    <article className="nutrient">
      <header className="nutrient__name child">Iron</header>
      <section className="outer">
        <div className="inner">
          <ul className="chart">
            <li>
              <span className="bar" style={{ height: "35%" }} title=""></span>
            </li>
            <li>
              <span className="bar" style={{ height: "70%" }} title=""></span>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
};

export default Nutrient;
