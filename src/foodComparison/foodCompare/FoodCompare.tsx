import React, { useState } from "react";
import { isEmpty } from "lodash";
import Creatable from "react-select/creatable";
import { ValueType } from "react-select";
import Menu, { OptionType } from "../menu/Menu";
import PieChart from "../pieChart/PieChart";
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

interface Props {}

type SelectedFoodsState = Record<string, FoodMainAttrs>;

const grouped = createGroupedOptions(items);

const handleSelectedFoods = (
  userSelection: string[],
  handler: (payload: SelectedFoodsState) => void
) => {
  if (isEmpty(userSelection)) {
    handler({});
    return;
  }
  Promise.all(
    userSelection.map<Promise<FoodPayload>>((selection: string) =>
      getFoodItem(selection)
    )
  ).then((foods: FoodPayload[]) => {
    handler(createSelectedFoodState(foods));
  });
};

const createSelectedFoodState = (foods: FoodPayload[]): SelectedFoodsState =>
  foods.reduce<SelectedFoodsState>((acc, prev) => {
    const food = getFood(prev);
    acc[food.food_name] = food;
    return acc;
  }, {});

const getUserSelectionValues = (
  userSelection: ValueType<OptionType>
): string[] =>
  Array.isArray(userSelection)
    ? userSelection.map<string>((x: OptionType) => x && x.value)
    : [];

const FoodCompare = (props: Props) => {
  const [selectedFoods, setSeletectFoods] = useState<SelectedFoodsState>({});
  console.error("@_selectedFoods", selectedFoods, Object.keys(selectedFoods));

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
      <PieChart values={[2, 4, 6, 8]} width={960} height={500} id="apple" />
    </>
  );
};

export default FoodCompare;
