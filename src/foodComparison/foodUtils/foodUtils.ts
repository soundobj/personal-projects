import produce from "immer";
import _nutrients from "../nutrients.json";
import minerals from "../minerals.json";
import vitamins from "../vitamins.json";
import foodComposition from "../foodComposition.json";

const nutrients: NutrientAttrs[] = _nutrients;

export interface Nutrient {
  attr_id: number;
  value: number;
}

export interface FoodAndNutrients extends FoodMainAttrs {
  minerals: PeriodicElementAndPercentages[];
  // vitamins: FoodNutrient[];
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
  nf_calories: number;
  photo: { thumb: string };
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
  element: string;
  state: string;
  url: string;
  color: string;
}

export interface FoodPercentage {
  food: string;
  percentage: number;
  nutrient: number;
}

interface Percentages {
  percentages: FoodPercentage[];
  unit: string;
  fda_daily_value: number;
}

export interface PeriodicElementAndPercentages
  extends PeriodicElement,
    Percentages {}

export interface FoodNutrient {
  name: string;
  symbol?: string;
  unit: string;
  fda_daily_value: number;
  percentages: number[];
}

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

export const getVitaminName = (description: string): { name: string } => {
  const [name] = description.split(",");
  return { name: name.split(" ")[1] };
};

export const MINERALS = minerals.map<number>((item) => item.id);
export const VITAMINS = vitamins.map<number>((item) => item.id);

export const getPieChartData = (food: FoodMainAttrs): number[] => {
  return foodComposition.map<number>((attr: PieCharttr) =>
    nutrientValuePer100gr(
      food.serving_weight_grams,
      food[attr.attr as FoodMainAttr]
    )
  );
};

export const getPercentage = (
  food: FoodMainAttrs,
  nutrient: NutrientAttrs,
  name: string
): FoodPercentage => {
  const foodNutrient = food.full_nutrients.find(
    (x: Nutrient) => x.attr_id === nutrient.attr_id
  );
  const percentage = calcPercentage(
    nutrientValuePer100gr(food.serving_weight_grams, foodNutrient?.value || 0),
    nutrient.fda_daily_value || 0
  );
  return { food: name, percentage, nutrient: foodNutrient?.attr_id || 0 };
};

export const getMinerals = (
  food: FoodMainAttrs,
  nutrients: number[]
): PeriodicElementAndPercentages[] =>
  nutrients.map<PeriodicElementAndPercentages>((n: number) => {
    const nutrient = getNutrient(n);
    const mineral = minerals.find((m) => m.id === n);
    if (!nutrient || !mineral) {
      return ({} as any) as PeriodicElementAndPercentages;
    }

    return {
      ...mineral,
      unit: nutrient.unit,
      fda_daily_value: nutrient.fda_daily_value || 0,
      percentages: [getPercentage(food, nutrient, food.food_name)],
    };
  });

export const getFoodProfile = () => {};

export const mergeFoodsNutrients = (
  foodNutrients: FoodAndNutrients[]
): FoodAndNutrients[] =>
  produce(foodNutrients, (draft: FoodAndNutrients[]) => {
    if (draft.length < 2) {
      return foodNutrients;
    }

    draft[0].minerals.map<PeriodicElementAndPercentages>((mineral, index) => {
      mineral.percentages.push(draft[1].minerals[index].percentages[0]);
      return mineral;
    });

    // draft[0].vitamins.map<FoodNutrient>((vitamins, index) => {
    //   vitamins.percentages.push(draft[1].vitamins[index].percentages[0]);
    //   return vitamins;
    // });

    return draft;
  });

export const calcWaterContentPercentage = (food: FoodMainAttrs): number => {
  const partial = [
    "nf_total_fat",
    "nf_saturated_fat",
    "nf_total_carbohydrate",
    "nf_dietary_fiber",
    "nf_sugars",
    "nf_protein",
    //@ts-ignore
  ].reduce<number>((prev, cur) => (prev += food[cur]), 0);
  return Math.round(100 - calcPercentage(partial, food.serving_weight_grams));
};

export interface LegendData {
  title: string;
  data: number[];
  url: string;
}

export const getLegend = (foods: FoodAndNutrients[]): LegendData[] =>
  foodComposition.map<LegendData>((item) => ({
    title: item.displayName,
    url: item.url,
    data: foods.map<number>((food: FoodAndNutrients) =>
      nutrientValuePer100gr(
        food.serving_weight_grams,
        food[item.attr as FoodMainAttr]
      )
    ),
  }));
