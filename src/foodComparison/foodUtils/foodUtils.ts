import { curryRight } from "lodash";
import produce from "immer";
import _nutrients from "../nutrients.json";
import { FoodAndNutrients } from "../foodCompare/FoodCompare";

const nutrients: NutrientAttrs[] = _nutrients;

export interface Nutrient {
  attr_id: number;
  value: number;
}

export interface FoodMainAttrs {
  nf_protein: number;
  nf_dietary_fiber: number;
  nf_saturated_fat: number;
  nf_total_fat: number;
  nf_total_carbohydrate: number;
  nf_sugars: number;
  serving_weight_grams: number;
  full_nutrients: Nutrient[];
  food_name: string;
}

export interface NutrientAttrs {
  attr_id: number;
  unit: string;
  usda_nutr_desc: string;
  fda_daily_value: number | null;
}

export interface FoodPayload {
  foods: FoodMainAttrs[];
}

export interface PieCharttr {
  displayName: string;
  attr: string;
}

export interface PeriodicElement {
  name: string;
  symbol: string;
}

export interface FoodNutrient {
  name: string;
  symbol?: string;
  unit: string;
  fda_daily_value: number;
  percentages: number[];
}

export const PIE_CHART_ATTRS = [
  { displayName: "Protein", attr: "nf_protein" },
  { displayName: "Fiber", attr: "nf_dietary_fiber" },
  { displayName: "Fat", attr: "nf_total_fat" },
  { displayName: "Saturated Fat", attr: "nf_saturated_fat" },
  { displayName: "Carbohydrate", attr: "nf_total_carbohydrate" },
  { displayName: "Sugar", attr: "nf_sugars" },
];

type FoodMainAttr =
  | "nf_protein"
  | "nf_dietary_fiber"
  | "nf_total_fat"
  | "nf_saturated_fat"
  | "nf_total_carbohydrate"
  | "nf_sugars";

export const nutrientValuePer100gr = (weight: number, value: number): number =>
  setFloatDecimals((100 * value) / weight);

export const calcPercentage = (partial: number, total: number): number =>
  setFloatDecimals((100 * partial) / total);

export const setFloatDecimals = (
  number: number,
  decimals: number = 2
): number => parseFloat(number.toFixed(decimals));

export const getNutrient = (id: number) =>
  nutrients.find((nutrient: NutrientAttrs) => nutrient.attr_id === id);

export const getElement = (description: string): PeriodicElement => {
  const [name, symbol] = description.split(", ");
  return { name, symbol };
};
export const getVitaminName = (description: string): { name: string } => {
  const [name] = description.split(",");
  return { name: name.split(' ')[1] };
};

export const MINERALS = [301, 303, 304, 305, 306, 307, 309, 312, 313, 315];

// @TODO do veg or fruit have b12 578 or b6 415? D 328
// 404 b1 thiamin

export const VITAMINS = [320, 415, 431, 401, 323, 430];

export const getPieChartData = (food: FoodMainAttrs): number[] => {
  return PIE_CHART_ATTRS.map<number>((attr: PieCharttr) =>
    nutrientValuePer100gr(
      food.serving_weight_grams,
      food[attr.attr as FoodMainAttr]
    )
  );
};

export const getFoodNutrients = (
  food: FoodMainAttrs,
  nutrients: number[],
  nameHandler: (name: string) => PeriodicElement | { name: string }
): FoodNutrient[] =>
  nutrients.map<FoodNutrient>((n: number) => {
    const nutrient = getNutrient(n);
    if (!nutrient) {
      return ({} as any) as FoodNutrient;
    }
    const foodNutrient = food.full_nutrients.find(
      (x: Nutrient) => x.attr_id === nutrient.attr_id
    );
    const percentage = calcPercentage(
      nutrientValuePer100gr(
        food.serving_weight_grams,
        foodNutrient?.value || 0
      ),
      nutrient.fda_daily_value || 0
    );
    return {
      ...nameHandler(nutrient?.usda_nutr_desc),
      unit: nutrient.unit,
      fda_daily_value: nutrient.fda_daily_value || 0,
      percentages: [percentage],
    };
  });

export const getMinerals = curryRight(getFoodNutrients)(getElement);
export const getVitamins = curryRight(getFoodNutrients)(getVitaminName);

export const getFoodProfile = () => {};

export const mergeFoodsNutrients = (
  foodNutrients: FoodAndNutrients[]
): FoodAndNutrients[] =>
  produce(foodNutrients, (draft: FoodAndNutrients[]) => {
    if (draft.length < 2) {
      return foodNutrients;
    }
    draft[0].minerals.map<FoodNutrient>((mineral, index) => {
      mineral.percentages.push(draft[1].minerals[index].percentages[0]);
      return mineral;
    });

    draft[0].vitamins.map<FoodNutrient>((vitamins, index) => {
      vitamins.percentages.push(draft[1].vitamins[index].percentages[0]);
      return vitamins;
    });

    return draft;
  });
