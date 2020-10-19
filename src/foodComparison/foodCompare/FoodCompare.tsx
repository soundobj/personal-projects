import React, { useState } from "react";
import { isEmpty } from "lodash";
import Creatable from "react-select/creatable";
import { ValueType } from "react-select";
import Menu, { OptionType } from "../menu/Menu";
import PieChart from "../pieChart/PieChart";
import Info from "../info/Info";
import FoodLegend from "../foodLegend/FoodLegend";
import {
  FoodPayload,
  getPieChartData,
  FoodMainAttrs,
  PeriodicElementAndPercentages,
  getMinerals,
  MINERALS,
  mergeFoodsNutrients,
  FoodPercentage,
} from "../foodUtils/foodUtils";
import getFoodItem, { getFood } from "../getFoodItem/getFoodItem";
import {
  createGroupedOptions,
  formatGroupLabel,
} from "../menu/options/Options";
import items from "../items.json";
import PopoverStickOnHover from "../popoverStickOnHover/PopoverStickOnHover";
import { ReactComponent as Icon } from "../assets/information-button.svg";
import FoodImage from "../foodImage/FoodImage";

import "../css/tools.scss";
import "./FoodCompare.scss";
import PeriodicElement from "../periodicElement/PeriodicElement";

export const LEGEND_CLASSES = [
  "transparent-black-triangle",
  "transparent-black-square",
];

export interface FoodAndNutrients extends FoodMainAttrs {
  minerals: PeriodicElementAndPercentages[];
  // vitamins: FoodNutrient[];
}

type SelectedFoodsState = FoodAndNutrients[];

const grouped = createGroupedOptions(items);

const handleSelectedFoods = (
  userSelection: string[],
  handler: (payload: SelectedFoodsState) => void
) => {
  Promise.all(
    userSelection.map<Promise<FoodPayload>>((selection: string) =>
      getFoodItem(selection)
    )
  ).then((foods: FoodPayload[]) => {
    handler(
      foods.map<FoodAndNutrients>((x) => {
        const food = getFood(x);
        return {
          ...food,
          minerals: getMinerals(food, MINERALS),
          // vitamins: getVitamins(food, VITAMINS),
        };
      })
    );
  });
};

const getUserSelectionValues = (
  userSelection: ValueType<OptionType>
): string[] =>
  Array.isArray(userSelection)
    ? userSelection.map<string>((x: OptionType) => x && x.value)
    : [];

const PopOver = (props: FoodMainAttrs) => (
  <PopoverStickOnHover
    delay={500}
    placement="bottom"
    component={<Info {...props} />}
  >
    <Icon
      style={{
        width: "16%",
        position: "absolute",
        left: "42%",
        top: "34.5%",
      }}
    />
  </PopoverStickOnHover>
);

const NutrientFooter = (props: { values: FoodPercentage[] }) => (
  <ul className="nutrientFooter">
    {props.values.map((item) => (
      <li className="nutrientFooter__item">{Math.round(item.percentage)}%</li>
    ))}
  </ul>
);

const FoodCompare = () => {
  const [selectedFoods, setSeletectFoods] = useState<SelectedFoodsState>([]);
  const foods = mergeFoodsNutrients(selectedFoods);
  console.error("@foods", foods);

  return (
    <div className="foodCompare__container">
      <nav className="foodCompare__nav">
        <Creatable
          components={{ Menu }}
          isMulti
          isValidNewOption={() => false}
          options={grouped}
          // @ts-ignore
          formatGroupLabel={formatGroupLabel}
          onChange={(value: ValueType<OptionType>) => {
            handleSelectedFoods(
              getUserSelectionValues(value),
              setSeletectFoods
            );
          }}
        />
      </nav>
      {isEmpty(foods) && <p>Choose some food </p>}
      {!isEmpty(foods) && (
        <>
          <main className="foodCompare__main">
            <FoodLegend />
            {foods.map((food: FoodMainAttrs, index: number) => (
              <PieChart
                key={food.food_name}
                values={getPieChartData(food)}
                width={960}
                height={500}
                name={food.food_name}
                legend={
                  <div
                    className={LEGEND_CLASSES[index]}
                    style={{ width: "15%" }}
                  />
                }
              >
                <FoodImage
                  food_name={food.food_name}
                  className="foodCompare__chartImage"
                />
                {/* <PopOver {...food} /> */}
              </PieChart>
            ))}
          </main>
          <footer className="foodCompare__footer">
            <h3>Minerals</h3>
            <ul className="nutrientList">
              {foods[0].minerals.map((mineral) => (
                <li key={mineral.name} className="nutrientList__item">
                  <PeriodicElement {...mineral}>
                    <NutrientFooter values={mineral.percentages} />
                  </PeriodicElement>
                </li>
              ))}
            </ul>
            {/* <h3>Vitamins</h3> 
           <ul className="nutrientList">
            {foods[0].vitamins.map((vitamin) => (
              <li key={vitamin.name} className="nutrientList__item">
                <Nutrient {...vitamin} />
              </li>
            ))}
          </ul> */}
          </footer>
        </>
      )}
    </div>
  );
};

export default FoodCompare;
