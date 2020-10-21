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
import PopoverStickOnHover from "../popoverStickOnHover/PopoverStickOnHover";
import { ReactComponent as Icon } from "../assets/information-button.svg";
import FoodImage from "../foodImage/FoodImage";
import { ReactComponent as INFO } from "../assets/info-medal.svg";

import "../css/tools.scss";
import "./FoodCompare.scss";
import PeriodicElement from "../periodicElement/PeriodicElement";

export const LEGEND_CLASSES = [
  "transparent-black-triangle",
  "transparent-black-square",
];


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
                    legend={
                      <div
                        className={LEGEND_CLASSES[index]}
                        style={{ width: "15%" }}
                      />
                    }
                  >
                    <INFO
                      style={{
                        position: "absolute",
                        width: "84%",
                        top: "8%",
                        left: "8%",
                      }}
                    />
                    <FoodImage
                      food_name={food.food_name}
                      className="foodCompare__chartImage"
                    />
                    {/* <PopOver {...food} /> */}
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
