import { nutrientValuePer100gr } from "../scripts/nutrientMap";

interface Nutrient {
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

export interface FoodPayload {
  foods: FoodMainAttrs[];
}

interface PIE_CHART_ATTR {
  displayName: string;
  attr: string;
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

export const MINERALS = [
  301,304,305,306,307,309,312,313,315
]

// @TODO do veg or fruit have b12 578 or b6 415?
export const VITAMINS = [
  320,323,328,401,430,578
]

export const getPieChartData = (foodData: FoodPayload): number[] => {
  const food = foodData.foods[0];
  return PIE_CHART_ATTRS.map<number>((attr: PIE_CHART_ATTR) =>
    nutrientValuePer100gr(
      food.serving_weight_grams,
      food[attr.attr as FoodMainAttr]
    )
  );
};

export const getMinerals = () => {

};

export const getVitamins = () => {

};

export const getFoodProfile = () => {

}
