import React from "react";
import { FoodPercentage, FoodAndNutrients } from "../foodUtils/foodUtils";
import PeriodicElement from "../periodicElement/PeriodicElement";

import "./MineralList.scss"

const NutrientFooter = (props: { values: FoodPercentage[] }) => (
  <ul className="NutrientFooter">
    {props.values.map((item, i) => (
      <li
        className={`NutrientFooter__item ${i === 1 ? 'dark' : ''}`}
        key={`${item.food}-${item.nutrient}`}
      >
        {Math.round(item.percentage)}
        {Math.round(item.percentage) > 0 && <span className="NutrientFooter__item__percentage">%</span>}
      </li>
    ))}
  </ul>
);

const MineralList = (props: { foods: FoodAndNutrients[] }) => {
  const { foods } = props;
  return (
    <>
      <h3>Minerals</h3>
      <ul className="MineralList">
        {foods[0].minerals.map((mineral) => (
          <li key={mineral.name} className="MineralList__item">
            <PeriodicElement {...mineral}>
              <NutrientFooter values={mineral.percentages} />
            </PeriodicElement>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MineralList;
