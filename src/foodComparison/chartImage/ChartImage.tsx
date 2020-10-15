import React from 'react'
import FoodImage, {FoodImageProps} from "../foodImage/FoodImage"

import "./ChartImage.scss"

const ChartImage = (props: FoodImageProps) => {
  const { food_name } = props;
  return (
    <div className="container">
      <FoodImage food_name={food_name} className="clip" /> 
    </div>
  )
}

export default ChartImage
