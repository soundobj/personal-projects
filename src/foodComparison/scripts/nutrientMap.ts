import fs from "fs";
import { find } from "lodash";
import nutrientsSubset from "../nutrients-subset.json";
import getFoodItem, {
  Food,
  Nutrient,
  getFood,
} from "../getFoodItem/getFoodItem";
import { getFoodDictionary } from "../typeAheadSuggestions/typeAheadsuggestions";

interface NutrientFood {
  food_name: string;
  value: number;
}

export const nutrientValuePer100gr = (weight: number, value: number): number =>
  (100 * value) / weight;

export const orderByValueDesc = (a: NutrientFood, b: NutrientFood) =>
  b.value - a.value;

export const nutrientFood = (food: Food, nutrient: Nutrient): NutrientFood => ({
  food_name: food.food_name,
  value: nutrientValuePer100gr(food.serving_weight_grams, nutrient.value),
});

export const prettyJSON = (json: any): string => JSON.stringify(json, null, 2) 

const foodDictionary = getFoodDictionary();
const nutrients = [...nutrientsSubset];

const addFoodNutrientsValues = (nutrients: any, food: any) =>
  nutrients.map((nutrient: any) => {
    if (!nutrient.foods) {
      nutrient.foods = [];
    }
    const foodItem = getFood(food);
    const foodNutrients = foodItem.full_nutrients;
    const nutrientMatch = find(
      foodNutrients,
      (x) => x.attr_id === nutrient.attr_id
    );
    if (nutrientMatch) {
      nutrient.foods.push(nutrientFood(foodItem, nutrientMatch));
      nutrient.foods.sort(orderByValueDesc);
    }
    return nutrient;
  });

const consumeFood = (food: string) =>
  getFoodItem(food)
    .then((value) => {
      addFoodNutrientsValues(nutrients, value);
    })
    .catch((e) => {
      console.error(`@_could not find item ${food}, error:`, e);
    });

Promise.all(foodDictionary.map(consumeFood)).then(() => {
  fs.writeFile(
    '../foodsByNutrient.json',
    prettyJSON(nutrients),
    (e) => { console.error('@_done', e);}
  );
});