import React from "react";
import FoodImage from "../foodImage/FoodImage";
import { ReactComponent as Medal } from "../assets/info-medal.svg";
import { ReactComponent as Wikipedia } from "../assets/wikipedia-logo.svg";
import {
  FoodMainAttrs,
  calcWaterContentPercentage,
  nutrientValuePer100gr,
} from "../foodUtils/foodUtils";

import "./FoodInfo.scss";

interface Props {
  food: FoodMainAttrs;
  className?: string;
}

const FoodInfo = (props: Props) => {
  const { food, className } = props;
  return (
    <article className={`FoodInfo ${className || ""}`}>
      <Medal className="FoodInfo__medal" />
      <FoodImage food_name={food.food_name} className="FoodInfo__image" />
      <span className="FoodInfo__calories">
        {nutrientValuePer100gr(food.serving_weight_grams, food.nf_calories)}
      </span>
      <span className="FoodInfo__serving">
        {Math.round(food.serving_weight_grams)}
      </span>
      <span className="FoodInfo__water">
        {calcWaterContentPercentage(props.food)}
      </span>
      <span className="FoodInfo__water__percentage">%</span>
      <Wikipedia className="FoodInfo__wikipedia" />
    </article>
  );
};

export default FoodInfo;
