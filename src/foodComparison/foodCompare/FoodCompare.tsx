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
  FoodNutrient,
  getVitamins,
  getMinerals,
  VITAMINS,
  MINERALS,
  mergeFoodsNutrients,
} from "../foodUtils/foodUtils";
import getFoodItem, { getFood } from "../getFoodItem/getFoodItem";
import {
  createGroupedOptions,
  formatGroupLabel,
} from "../menu/options/Options";
import items from "../items.json";
import Nutrient from "../nutrient/Nutrient";
import PopoverStickOnHover from "../popoverStickOnHover/PopoverStickOnHover";
import { ReactComponent as Icon } from "../assets/information-button.svg";

import "./FoodCompare.scss";

export interface FoodAndNutrients extends FoodMainAttrs {
  minerals: FoodNutrient[];
  vitamins: FoodNutrient[];
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
          vitamins: getVitamins(food, VITAMINS),
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

const FoodCompare = () => {
  const [selectedFoods, setSeletectFoods] = useState<SelectedFoodsState>([]);
  const foods = mergeFoodsNutrients(selectedFoods);
  console.error("@foods", foods);

  const PopOver = (props: FoodMainAttrs) => (
    <PopoverStickOnHover
      delay={500}
      placement="bottom"
      onMouseEnter={() => console.error("@_ enterMouse")}
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
      {isEmpty(foods) && <p>choose some food </p>}
      {!isEmpty(foods) && (
        <>
          <div className="foodList">
            <FoodLegend />
            {foods.map((food: FoodMainAttrs) => (
              <PieChart
                key={food.food_name}
                values={getPieChartData(food)}
                width={960}
                height={500}
                name={food.food_name}
              >
                <PopOver {...food}  />
              </PieChart>
            ))}
          </div>
          <h3>Minerals</h3>
          <ul className="nutrientList">
            {foods[0].minerals.map((mineral) => (
              <li key={mineral.name} className="nutrientList__item">
                <Nutrient {...mineral} />
              </li>
            ))}
          </ul>
          <h3>Vitamins</h3>
          <ul className="nutrientList">
            {foods[0].vitamins.map((vitamin) => (
              <li key={vitamin.name} className="nutrientList__item">
                <Nutrient {...vitamin} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FoodCompare;
