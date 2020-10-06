import _nutrients from "../nutrients.json";

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

export const nutrientValuePer100gr = (weight: number, value: number): number =>
  (100 * value) / weight;

export const calcPercentage = (partial: number, total: number) =>
  (100 * partial) / total;

export const getNutrient = (id: number) =>
  nutrients.find((nutrient: NutrientAttrs) => nutrient.attr_id === id);

export const getElement = (description: string): PeriodicElement => {
  const [name, symbol] = description.split(", ");
  return { name, symbol };
};
  
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

export const MINERALS = [301, 304, 305, 306, 307, 309, 312, 313, 315];

// @TODO do veg or fruit have b12 578 or b6 415?
export const VITAMINS = [320, 323, 328, 401, 430, 578];

export const getPieChartData = (food: FoodMainAttrs): number[] => {
  return PIE_CHART_ATTRS.map<number>((attr: PieCharttr) =>
    nutrientValuePer100gr(
      food.serving_weight_grams,
      food[attr.attr as FoodMainAttr]
    )
  );
};

// export const getNutrients = (): Promise<NutrientAttrs[]> =>

export const getMinerals = () => {};

export const getVitamins = () => {};

export const getFoodProfile = () => {};
