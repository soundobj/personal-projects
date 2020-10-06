import React from "react";

import "../css/tools.scss";
import "./Nutrient.scss";

interface Props {
  name: string;
  GDA: { unit: string; value: number };
  percentages: number[];
}

const Nutrient = (props: Props) => {
  const { name, GDA, percentages } = props;
  return (
    <article className="outer nutrient">
      <div className="inner">
        <header className="nutrient__name">{name}</header>
        <ul className="chart">
          {percentages.map((percentage) => (
            <li>
              <span className="bar" style={{ height: `${percentage}%` }} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Nutrient;
