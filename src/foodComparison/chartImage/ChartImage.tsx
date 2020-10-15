import React from "react";
import FoodImage, { FoodImageProps } from "../foodImage/FoodImage";

import "./ChartImage.scss";

const ChartImage = (props: FoodImageProps) => {
  const { food_name } = props;
  return (
    <div className="squareBorder">
      <FoodImage food_name={"banana"} className="chartImage__clip" />
    </div>
  );
};

export default ChartImage;
