import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import Creatable from "react-select/creatable";
import { ValueType } from "react-select";
import Menu, { OptionType } from "../menu/Menu";
import PieChart from "../pieChart/PieChart";
import FoodLegend from "../foodLegend/FoodLegend";
import {
  FoodPayload,
  getPieChartData,
  FoodMainAttrs,
  getMinerals,
  MINERALS,
  mergeFoodsNutrients,
  FoodAndNutrients,
  getLegend,
  getFood,
  getFoodItem,
} from "../foodUtils/foodUtils";

import {
  createGroupedOptions,
  formatGroupLabel,
} from "../menu/options/Options";
import items from "../items.json";
import FoodInfo from "../foodInfo/FoodInfo";
import MineralList from "../mineralList/MineralList";
import SectionTitle from "../sectionTitle/SectionTitle";
import ChooseFood from "../chooseFood/ChooseFood";

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

const GDA = () => (
  <>
    percentage of <span title="Guideline Daily Amount">GDA</span> per 100 gr
  </>
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
      {isEmpty(foods) && <ChooseFood />}
      {!isEmpty(foods) && (
        <>
          <main className="foodCompare__main">
            <SectionTitle content="Composition Ratio" />
            <ul className="foodCompare__items">
              {foods.map((food: FoodMainAttrs, index: number) => (
                <li key={food.food_name}>
                  <PieChart
                    values={getPieChartData(food)}
                    width={850}
                    height={850}
                    name={food.food_name}
                  >
                    <FoodInfo
                      food={food}
                      className={index === 1 ? "dark" : ""}
                    />
                  </PieChart>
                </li>
              ))}
            </ul>
            <SectionTitle
              content={
                <>
                  Macronutrients: <GDA />
                </>
              }
            />
            <FoodLegend legendData={getLegend(selectedFoods)} />
          </main>
          <footer className="foodCompare__footer">
            <SectionTitle
              content={
                <>
                  Minerals: <GDA />
                </>
              }
            />
            <MineralList foods={foods} />
          </footer>
        </>
      )}
    </div>
  );
};

export default FoodCompare;
