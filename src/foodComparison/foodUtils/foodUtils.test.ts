import {
  getPieChartData,
  getMinerals,
  // getVitamins,
  FoodMainAttrs,
  calcWaterContentPercentage,
  getFoodItem,
} from "./foodUtils";

const payload = ({
  food_name: "apple",
  brand_name: null,
  serving_qty: 1,
  serving_unit: 'medium (3" dia)',
  serving_weight_grams: 182,
  nf_calories: 94.64,
  nf_total_fat: 0.31,
  nf_saturated_fat: 0.05,
  nf_cholesterol: 0,
  nf_sodium: 1.82,
  nf_total_carbohydrate: 25.13,
  nf_dietary_fiber: 4.37,
  nf_sugars: 18.91,
  nf_protein: 0.47,
  nf_potassium: 194.74,
  nf_p: 20.02,
  full_nutrients: [
    { attr_id: 203, value: 0.4732 },
    { attr_id: 204, value: 0.3094 },
    { attr_id: 205, value: 25.1342 },
    { attr_id: 207, value: 0.3458 },
    { attr_id: 208, value: 94.64 },
    { attr_id: 209, value: 0.091 },
    { attr_id: 210, value: 3.7674 },
    { attr_id: 211, value: 4.4226 },
    { attr_id: 212, value: 10.738 },
    { attr_id: 213, value: 0 },
    { attr_id: 214, value: 0 },
    { attr_id: 221, value: 0 },
    { attr_id: 255, value: 155.7192 },
    { attr_id: 262, value: 0 },
    { attr_id: 263, value: 0 },
    { attr_id: 268, value: 396.76 },
    { attr_id: 269, value: 18.9098 },
    { attr_id: 287, value: 0 },
    { attr_id: 291, value: 4.368 },
    { attr_id: 301, value: 500 },
    { attr_id: 303, value: 0.2184 },
    { attr_id: 304, value: 9.1 },
    { attr_id: 305, value: 20.02 },
    { attr_id: 306, value: 194.74 },
    { attr_id: 307, value: 1.82 },
    { attr_id: 309, value: 0.0728 },
    { attr_id: 312, value: 0.0491 },
    { attr_id: 313, value: 6.006 },
    { attr_id: 315, value: 0.0637 },
    { attr_id: 317, value: 0 },
    { attr_id: 318, value: 98.28 },
    { attr_id: 319, value: 0 },
    { attr_id: 320, value: 5.46 },
    { attr_id: 321, value: 49.14 },
    { attr_id: 322, value: 0 },
    { attr_id: 323, value: 0.3276 },
    { attr_id: 324, value: 0 },
    { attr_id: 328, value: 0 },
    { attr_id: 334, value: 20.02 },
    { attr_id: 337, value: 0 },
    { attr_id: 338, value: 52.78 },
    { attr_id: 341, value: 0 },
    { attr_id: 342, value: 0 },
    { attr_id: 343, value: 0 },
    { attr_id: 401, value: 44.52 }, // LEMON STRENGHT
    { attr_id: 404, value: 0.0309 },
    { attr_id: 405, value: 0.0473 },
    { attr_id: 406, value: 0.1656 },
    { attr_id: 410, value: 0.111 },
    { attr_id: 415, value: 0.0746 },
    { attr_id: 417, value: 5.46 },
    { attr_id: 418, value: 0 },
    { attr_id: 421, value: 6.188 },
    { attr_id: 429, value: 0 },
    { attr_id: 430, value: 4.004 },
    { attr_id: 431, value: 0 },
    { attr_id: 432, value: 5.46 },
    { attr_id: 435, value: 5.46 },
    { attr_id: 454, value: 0.182 },
    { attr_id: 501, value: 0.0018 },
    { attr_id: 502, value: 0.0109 },
    { attr_id: 503, value: 0.0109 },
    { attr_id: 504, value: 0.0237 },
    { attr_id: 505, value: 0.0218 },
    { attr_id: 506, value: 0.0018 },
    { attr_id: 507, value: 0.0018 },
    { attr_id: 508, value: 0.0109 },
    { attr_id: 509, value: 0.0018 },
    { attr_id: 510, value: 0.0218 },
    { attr_id: 511, value: 0.0109 },
    { attr_id: 512, value: 0.0091 },
    { attr_id: 513, value: 0.02 },
    { attr_id: 514, value: 0.1274 },
    { attr_id: 515, value: 0.0455 },
    { attr_id: 516, value: 0.0164 },
    { attr_id: 517, value: 0.0109 },
    { attr_id: 518, value: 0.0182 },
    { attr_id: 601, value: 0 },
    { attr_id: 605, value: 0 },
    { attr_id: 606, value: 0.051 },
    { attr_id: 607, value: 0 },
    { attr_id: 608, value: 0 },
    { attr_id: 609, value: 0 },
    { attr_id: 610, value: 0 },
    { attr_id: 611, value: 0 },
    { attr_id: 612, value: 0.0018 },
    { attr_id: 613, value: 0.0437 },
    { attr_id: 614, value: 0.0055 },
    { attr_id: 617, value: 0.0127 },
    { attr_id: 618, value: 0.0783 },
    { attr_id: 619, value: 0.0164 },
    { attr_id: 620, value: 0 },
    { attr_id: 621, value: 0 },
    { attr_id: 626, value: 0 },
    { attr_id: 627, value: 0 },
    { attr_id: 628, value: 0 },
    { attr_id: 629, value: 0 },
    { attr_id: 630, value: 0 },
    { attr_id: 631, value: 0 },
    { attr_id: 636, value: 21.84 },
    { attr_id: 645, value: 0.0127 },
    { attr_id: 646, value: 0.0928 },
  ],
} as any) as FoodMainAttrs;

describe("foodComparison/foodUtils", () => {
  describe("getPieChartData", () => {
    it("gets the values for the pieChart", () => {
      const expected = [0.26, 2.4, 0.17, 0.03, 13.81, 10.39];
      expect(getPieChartData(payload)).toMatchObject(expected);
    });
  });
  describe("getMinerals", () => {
    it("gets the minerals data percentages for a food", () => {
      const nutrients = getMinerals(payload, [301]);
      const expected = [
        {
          name: "Calcium",
          symbol: "Ca",
          unit: "mg",
          fda_daily_value: 1000,
          percentages: [27.47],
        },
      ];

      expect(nutrients).toMatchObject(expected);
    });
  });

  // describe("getVitamins", () => {
  //   it("gets the minerals data percentages for a food", () => {
  //     const vitamins = getVitamins(payload, [401]);
  //     const expected = [
  //       { name: "C", unit: "mg", fda_daily_value: 60, percentages: [40.77] },
  //     ];
  //     expect(vitamins).toMatchObject(expected);
  //   });
  // });

  describe("calculateWaterContentPercentage", () => {
    it("gets the amount of water per 100 grms", () => {});
    const res = calcWaterContentPercentage(payload);
    expect(res).toEqual(73);
  });

  describe("getFoodItem", () => {
    //@ts-ignore
    getFilePath = jest.fn((item: string) => {
      return `./${item}.json`;
    });
    it("dynamically imports food item json", () => {
      return getFoodItem(" food item ").then((res) => {
        //@ts-ignore
        expect(res.default).toMatchObject({ foo: "bar" });
      });
    });
  });
});
