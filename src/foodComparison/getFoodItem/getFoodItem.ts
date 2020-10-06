import { FoodPayload, FoodMainAttrs } from "../foodUtils/foodUtils";


export const getFood = (food: FoodPayload): FoodMainAttrs => food.foods[0];

export const spacesToHyphen = (text: string) => text.trim().replace(/ /g, "-");

export const getFilePath = (item: string) =>
  `${process.env["REACT_APP_FOOD_COMPARISON_ROOT_FILE"]}foods/${item}.json`;  

const getFoodItem = (item: string): Promise<FoodPayload> =>
  import(
    `${
      process.env["REACT_APP_FOOD_COMPARISON_ROOT_FILE"]
    }foods/${spacesToHyphen(item)}.json`
  );

export default getFoodItem;
