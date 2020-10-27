import React from "react";
import { ReactComponent as Medal } from "../assets/info-medal.svg";

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
      <img src={`${process.env.PUBLIC_URL}/foodCompare/thumbs/${food.food_name}.jpg`} className="FoodInfo__image" />
      <span className="FoodInfo__calories">
        {nutrientValuePer100gr(food.serving_weight_grams, food.nf_calories)}
      </span>
      <span className="FoodInfo__serving">
        {Math.round(food.serving_weight_grams)}
      </span>
      <div className="FoodInfo__water">
        {calcWaterContentPercentage(props.food)}
        <span className="FoodInfo__water__percentage">%</span>
      </div>
      <img className="FoodInfo__wikipedia" src={process.env.PUBLIC_URL + '/foodCompare/wikipedia.png'} />
    </article>
  );
};

export default FoodInfo;
