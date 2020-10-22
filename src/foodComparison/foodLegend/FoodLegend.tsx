import React from "react";
import { schemeSet2 } from "d3";
import { LegendData } from "../foodUtils/foodUtils";
import color from "color";

import "./FoodLegend.scss";

const FoodLegend = (props: { legendData: LegendData[] }) => {
  const { legendData } = props;
  return (
    <>
      <h3>
        Macronutrients: percentage of{" "}
        <span title="Guideline Daily Amoun">GDA</span> per 100 gr
      </h3>
      <ul className="foodLegend">
        {legendData.map((item: LegendData, i: number) => (
          <li key={item.title} className="foodLegend__list">
            <article
              className="foodLegend__item"
              style={{ backgroundColor: schemeSet2[i] }}
            >
              <header className="foodLegend__item__title">
                <a target="new" href={item.url}>
                  {item.title}
                </a>
              </header>
              <ul className="foodLegend__item__values">
                {item.data.map((value, index) => (
                  <li
                    className={`foodLegend__item__value ${
                      index === 1 && "dark"
                    }`}
                    style={
                      index === 1 ? { borderLeft: `solid 2px ${color(schemeSet2[i]).darken(.2)}` } : {}
                    }
                  >
                    {Math.round(value)}
                    {Math.round(value) > 0 && (
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
    </>
  );
};

export default FoodLegend;
