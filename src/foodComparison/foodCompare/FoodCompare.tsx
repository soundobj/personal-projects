import React, { useState, useEffect } from "react";
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
  getMinerals,
  MINERALS,
  mergeFoodsNutrients,
  FoodPercentage,
  FoodAndNutrients,
  getLegend,
} from "../foodUtils/foodUtils";
import getFoodItem, { getFood } from "../getFoodItem/getFoodItem";
import {
  createGroupedOptions,
  formatGroupLabel,
} from "../menu/options/Options";
import items from "../items.json";
import FoodInfo from "../foodInfo/FoodInfo";
import PopoverStickOnHover from "../popoverStickOnHover/PopoverStickOnHover";
import PeriodicElement from "../periodicElement/PeriodicElement";

import "../css/tools.scss";
import "./FoodCompare.scss";


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

// const PopOver = (props: FoodMainAttrs) => (
//   <PopoverStickOnHover
//     delay={500}
//     placement="bottom"
//     component={<Info {...props} />}
//   >
//     <p>target</p>
//   </PopoverStickOnHover>
// );

const NutrientFooter = (props: { values: FoodPercentage[] }) => (
  <ul className="nutrientFooter">
    {props.values.map((item) => (
      <li
        className="nutrientFooter__item"
        key={`${item.food}-${item.nutrient}`}
      >
        {Math.round(item.percentage)}%
      </li>
    ))}
  </ul>
);

const FoodCompare = () => {
  const [selectedFoods, setSeletectFoods] = useState<SelectedFoodsState>([]);
  const foods = mergeFoodsNutrients(selectedFoods);
  console.error("@foods", foods);

  const defaultValues = [
    { label: "Kiwi", value: "kiwi" },
    { label: "Peanut", value: "peanut" },
  ];

  useEffect(
    () =>
      handleSelectedFoods(
        defaultValues.map((x) => x.value),
        setSeletectFoods
      ),
    []
  );

  return (
    <div className="foodCompare__container">
      <nav className="foodCompare__nav">
        <Creatable
          defaultValue={defaultValues}
          components={{ Menu }}
          isMulti
          isValidNewOption={() => false}
          options={grouped}
          classNamePrefix="react-select"
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
            <ul className="foodCompare__items">
              {foods.map((food: FoodMainAttrs, index: number) => (
                <li key={food.food_name}>
                  <PieChart
                    values={getPieChartData(food)}
                    width={850}
                    height={850}
                    name={food.food_name}
                  >
                    <FoodInfo food={food} className={index === 1 ? "dark" : ""} />
                  </PieChart>
                </li>
              ))}
            </ul>
            <FoodLegend legendData={getLegend(selectedFoods)} />
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
