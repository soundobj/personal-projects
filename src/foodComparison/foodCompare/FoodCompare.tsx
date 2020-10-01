import React, { useState } from "react";
import Creatable from "react-select/creatable";
import { ValueType } from "react-select";
import Menu, { OptionType } from "../menu/Menu";
import PieChart from "../pieChart/PieChart";
import { FoodPayload, getPieChartData } from "../foodUtils/foodUtils";
import getFoodItem from "../getFoodItem/getFoodItem";
import { createGroupedOptions, formatGroupLabel } from "../menu/options/Options";
import items from '../items.json'

interface Props {
  
}

const grouped = createGroupedOptions(items)

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const FoodCompare = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<ValueType<OptionType>>(null);
  const [selectedFoods, setSeletectFoods] = useState<Record<string, FoodPayload>>({})

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
          //@ts-ignore
          console.error('@_changed', value);
          setSelectedOption(value);
          const val = Array.isArray(value) && value[0].value
          getFoodItem(val).then((food: FoodPayload) => {
            console.error('@_got food', food);
            setSeletectFoods({[val]: food})
          })
        }}
      />
      <PieChart values={[2,4,6,8]} width={960} height={500} id="apple" />
    </>
  );
};

export default FoodCompare;
