import fs from "fs";
import { find } from "lodash";
import nutrientsSubset from "../nutrients-subset.json";
import { getFoodDictionary } from "../typeAheadSuggestions/typeAheadsuggestions";
import { FoodMainAttrs, Nutrient, nutrientValuePer100gr, getFoodItem, getFood } from "../foodUtils/foodUtils";

interface NutrientFood {
  food_name: string;
  value: number;
}

export interface NutrientList {
  attr_id: number;
  usda_tag: string | null;
  type: string;
  VITAMIN?: string;
  foods: NutrientFood[];
}

export const orderByValueDesc = (a: NutrientFood, b: NutrientFood) =>
  b.value - a.value;

export const nutrientFood = (
  food: FoodMainAttrs,
  nutrient: Nutrient
): NutrientFood => ({
  food_name: food.food_name,
  value: nutrientValuePer100gr(food.serving_weight_grams, nutrient.value),
});

export const prettyJSON = (json: any): string => JSON.stringify(json, null, 2);

const foodDictionary = getFoodDictionary();
const nutrients = [...nutrientsSubset] as NutrientList[];

const addFoodNutrientsValues = (nutrients: any, food: any) =>
  nutrients.map((nutrient: any) => {
    const foodItem = getFood(food);
    const nutrientMatch = find(
      foodItem.full_nutrients,
      (x) => x.attr_id === nutrient.attr_id
    );
    if (nutrientMatch) {
      nutrient.foods.push(nutrientFood(foodItem, nutrientMatch));
    }
  });

const doFood = (food: string) =>
  getFoodItem(food)
    .then((value) => {
      addFoodNutrientsValues(nutrients, value);
    })
    .catch((e) => {
      console.error(`@_could not find item ${food}, error:`, e);
    });

Promise.all(foodDictionary.map(doFood)).then(() => {
  nutrients.map((n) => n.foods.sort(orderByValueDesc));
  fs.writeFile("../foodsByNutrient.json", prettyJSON(nutrients), (e) => {
    console.error("@_done, errors:", e);
  });
});
