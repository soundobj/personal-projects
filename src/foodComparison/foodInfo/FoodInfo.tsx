import React from "react";
import { ReactComponent as Medal } from "../assets/info-medal.svg";
import foodWikiLinks from "../foodWikiLinks.json";
import {
  FoodMainAttrs,
  calcWaterContentPercentage,
  nutrientValuePer100gr,
  spacesToHyphen,
} from "../foodUtils/foodUtils";

import "./FoodInfo.scss";

interface Props {
  food: FoodMainAttrs;
  className?: string;
}

export const Image = (props: { className: string; food: string }) => {
  const { className, food } = props;
  return (
    <img
      src={`${process.env.PUBLIC_URL}/foodCompare/thumbs/${spacesToHyphen(
        food
      )}.jpg`}
      className={className || ""}
    />
  );
};

const FoodInfo = (props: Props) => {
  const { food, className } = props;
  const waterPercentage = calcWaterContentPercentage(props.food)
  return (
    <article className={`FoodInfo ${className || ""}`}>
      <Medal className="FoodInfo__medal" />
      <Image food={food.food_name} className="FoodInfo__image" />
      <span className="FoodInfo__calories">
        {nutrientValuePer100gr(food.serving_weight_grams, food.nf_calories)}
      </span>
      <span className="FoodInfo__serving">
        {Math.round(food.serving_weight_grams)}
      </span>
      <div className="FoodInfo__water">
        {Math.sign(waterPercentage) > 0 ? waterPercentage : 0}
        <span className="FoodInfo__water__percentage">%</span>
      </div>
      { /* @ts-ignore */ }
      <a href={foodWikiLinks[food.food_name]} target="new" className="FoodInfo__wikipedia">
        <img
          className="FoodInfo__wikipedia__img"
          src={process.env.PUBLIC_URL + "/foodCompare/wikipedia.png"}
        />
      </a>
    </article>
  );
};

export default FoodInfo;
