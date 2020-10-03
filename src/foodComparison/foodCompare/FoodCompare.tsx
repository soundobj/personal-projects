import React, { useState } from "react";
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
} from "../foodUtils/foodUtils";
import getFoodItem, { getFood } from "../getFoodItem/getFoodItem";
import {
  createGroupedOptions,
  formatGroupLabel,
} from "../menu/options/Options";
import items from "../items.json";

import "./FoodCompare.scss";

interface Props {}

// type SelectedFoodsState = Record<string, FoodMainAttrs>;
type SelectedFoodsState = FoodMainAttrs[];

const grouped = createGroupedOptions(items);

const handleSelectedFoods = (
  userSelection: string[],
  handler: (payload: SelectedFoodsState) => void
) => {
  // if (isEmpty(userSelection)) {
  //   handler({});
  //   return;
  // }
  Promise.all(
    userSelection.map<Promise<FoodPayload>>((selection: string) =>
      getFoodItem(selection)
    )
  ).then((foods: FoodPayload[]) => {
    handler(
      foods.map<FoodMainAttrs>((x) => getFood(x))
    );
  });
};

// const createSelectedFoodState = (foods: FoodPayload[]): SelectedFoodsState =>
//   foods.reduce<SelectedFoodsState>((acc, prev) => {
//     const food = getFood(prev);
//     acc[food.food_name] = food;
//     return acc;
//   }, {});

const getUserSelectionValues = (
  userSelection: ValueType<OptionType>
): string[] =>
  Array.isArray(userSelection)
    ? userSelection.map<string>((x: OptionType) => x && x.value)
    : [];

const FoodCompare = (props: Props) => {
  const [selectedFoods, setSeletectFoods] = useState<SelectedFoodsState>([]);

  return (
    <>
      <Creatable
        components={{ Menu }}
        isMulti
        isValidNewOption={() => false}
        options={grouped}
        // @ts-ignore
        formatGroupLabel={formatGroupLabel}
        onChange={(value: ValueType<OptionType>) => {
          handleSelectedFoods(getUserSelectionValues(value), setSeletectFoods);
        }}
      />
      <div className="foodList">
        <FoodLegend />
        {!isEmpty(selectedFoods) &&
          selectedFoods.map((food: FoodMainAttrs) => (
            <PieChart
              key={food.food_name}
              values={getPieChartData(food)}
              width={960}
              height={500}
              name={food.food_name}
            />
          ))}
      </div>
    </>
  );
};

export default FoodCompare;
