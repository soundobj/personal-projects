import React, { useEffect, useState } from "react";
import { spacesToHyphen } from "../getFoodItem/getFoodItem";
import placeholder from "../assets/image-placeholder.svg";
import { FoodMainAttrs } from "../foodUtils/foodUtils";

type Module = {
  default: string;
};

export interface FoodImageProps extends Pick<FoodMainAttrs, "food_name"> {
  className?: string;
}

const FoodImage = (props: FoodImageProps) => {
  const [image, setImage] = useState<Module>();
  const { food_name, className } = props;
  useEffect(() => {
    try {
      import(
        `${
          process.env["REACT_APP_FOOD_COMPARISON_ROOT_FILE"]
        }thumbs/${spacesToHyphen(food_name)}.jpg`
      ).then((img: Module) => {
        setImage(img);
      });
    } catch (error) {
      console.error(`ERROR fetching image ${food_name}`);
    }
  }, [food_name]);

  return (
    <img
      className={`${className || ""}`}
      src={(image && image.default) || placeholder}
      alt={food_name}
    />
  );
};

export default FoodImage;
