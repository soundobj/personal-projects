import React from "react";

import { FoodNutrient } from "../foodUtils/foodUtils";

import "./Nutrient.scss";

const Nutrient = (props: FoodNutrient) => {
  const { name, unit, fda_daily_value, percentages } = props;
  return (
    <article className="outer nutrient">
      <div className="inner">
        <header className="nutrient__name">{name}</header>
        <ul className="chart">
          {percentages.map((percentage, index) => (
            <li key={`${name}${index}`}>
              <span
                className="bar"
                style={{ height: `${percentage > 100 ? 100 : percentage}%` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Nutrient;
