import React from "react";
import { schemeSet2 } from "d3";
import { Legend, get5FoodsHighOnNutrient } from "../foodUtils/foodUtils";
import color from "color";

import "./FoodLegend.scss";

const FoodLegend = (props: { legendData: Legend[] }) => {
  const { legendData } = props;
  console.error('@_ld', legendData, get5FoodsHighOnNutrient(legendData[0].attr_id));
  return (
    <ul className="foodLegend">
      {legendData.map((item: Legend, i: number) => (
        <li key={item.title} className="foodLegend__list">
          <article
            className="foodLegend__item"
            style={{ backgroundColor: schemeSet2[i] }}
          >
            <header className="foodLegend__item__title">
              <a
                target="new"
                href={item.url}
                title={`find out more on ${item.title}`}
              >
                {item.title}
              </a>
            </header>
            <ul className="foodLegend__item__values">
              {item.values.map((value, index) => (
                <li
                  title={`${value.weightPer100gr}gr of ${item.fda_daily_value}gr`}
                  className={`foodLegend__item__value ${index === 1 && "dark"}`}
                  style={
                    index === 1
                      ? {
                          borderLeft: `solid 2px ${color(schemeSet2[i]).darken(
                            0.2
                          )}`,
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
        </li>
      ))}
    </ul>
  );
};

export default FoodLegend;
