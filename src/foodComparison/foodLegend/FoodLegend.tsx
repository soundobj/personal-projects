import React from "react";
import { schemeSet2 } from "d3";
import color from "color";
import { Legend, getNFoodsHighOnNutrient } from "../foodUtils/foodUtils";
import PopoverStickOnHover from "../popoverStickOnHover/PopoverStickOnHover";
import NutrientInfo from "../nutrientInfo/NutrientInfo";

import "./FoodLegend.scss";

const FoodLegend = (props: { legendData: Legend[] }) => {
  const { legendData } = props;
  return (
    <ul className="foodLegend">
      {legendData.map((item: Legend, i: number) => (
        <li key={item.title} className="foodLegend__list">
          <PopoverStickOnHover
            delay={500}
            placement="top"
            component={
              <NutrientInfo
                info={item}
                foods={getNFoodsHighOnNutrient(item.attr_id)}
              />
            }
          >
            <article
              className="foodLegend__item"
              style={{ backgroundColor: schemeSet2[i] }}
            >
              <header className="foodLegend__item__title">{item.title}</header>
              <ul className="foodLegend__item__values">
                {item.values.map((value, index) => (
                  <li
                    className={`foodLegend__item__value ${
                      index === 1 && "dark"
                    }`}
                    style={
                      index === 1
                        ? {
                            borderLeft: `solid 2px ${color(
                              schemeSet2[i]
                            ).darken(0.2)}`,
                          }
                        : {}
                    }
                  >
                    {Math.round(value.fda_percentage)}
                    {Math.round(value.fda_percentage) > 0 && (
                      <span className="foodLegend__item__value__percentage">
                        %
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          </PopoverStickOnHover>
        </li>
      ))}
    </ul>
  );
};

export default FoodLegend;
