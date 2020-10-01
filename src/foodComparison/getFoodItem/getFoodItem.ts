export interface Food {
  full_nutrients: Nutrient[];
  food_name: string;
  serving_weight_grams: number;
}

export interface Nutrient {
  attr_id: number;
  value: number;
}

export const getFood = (json: any): Food => json?.foods[0] as Food;

export const spacesToHyphen = (text: string) => text.trim().replace(/ /g, "-");

export const getFilePath = (item: string) =>
  `${process.env["REACT_APP_FOOD_COMPARISON_ROOT_FILE"]}foods/tomato.json`;

export const nutrientValuePer100gr = (weight: number, value: number): number =>
  (100 * value) / weight;

// @TODO add type for the promise
const getFoodItem = (item: string): Promise<any> =>
  import(
    `${
      process.env["REACT_APP_FOOD_COMPARISON_ROOT_FILE"]
    }foods/${spacesToHyphen(item)}.json`
  );

export default getFoodItem;
