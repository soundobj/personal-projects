import React from "react";
import { schemeSet2 } from "d3";
import { PIE_CHART_ATTRS, PieCharttr } from "../foodUtils/foodUtils";

import "./FoodLegend.scss";

interface Props {}

const FoodLegend = (props: Props) => {
  return (
    <ul className="foodLegend">
      {PIE_CHART_ATTRS.map((attr: PieCharttr, i: number) => (
        <li key={attr.displayName}>
          <dl>
            <dd className="foodLegend__colour" style={{backgroundColor: schemeSet2[i]}} />
            <dt>{attr.displayName}</dt>
          </dl>
        </li>
      ))}
    </ul>
  );
};

export default FoodLegend;
