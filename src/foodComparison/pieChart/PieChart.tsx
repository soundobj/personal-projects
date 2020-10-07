// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./PieChart.scss";

interface Props {
  values: number[];
  width: number;
  height: number;
  name: string;
}

const enterClockwise = {
  startAngle: 0,
  endAngle: 0,
};

export const getRadius = (width: number, height: number) =>
  Math.min(width, height) / 2;

const PieChart = (props: Props) => {
  const [currentChart, setCurrentChart] = useState<string | undefined>(undefined);
  const ref = useRef(null);
  
  const { values, width, height, name } = props;
  const radius = getRadius(width, height);
  const INNER_RADIUS = radius - 120;
  const OUTER_RADIUS = radius - 10;

  const arc = d3.arc().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS);

  function arcTween(_arc) {
    const interpolation = d3.interpolate(this._current, _arc);
    this._current = interpolation(0);
    return (item) => arc(interpolation(item));
  }

  useEffect(() => {
    let playLoadingAnimation = true;

    if (currentChart) {
      ref.current.innerHTML = "";
      playLoadingAnimation = false;
    }

    const color = d3.schemeSet2;
    const pie = d3.pie().sort(null);

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin");

    const path = svg
      .selectAll("path")
      .data(pie(values))
      .enter()
      .append("path")
      .attr("fill", (d, i) => color[i]);

    if (playLoadingAnimation) {
      path.attr("d", arc(enterClockwise)).each(function (d) {
        this._current = {
          data: d.data,
          value: d.value,
          startAngle: enterClockwise.startAngle,
          endAngle: enterClockwise.endAngle,
        };
      });
      path.transition().duration(450).attrTween("d", arcTween);
    } else {
      path.attr(
        "d",
        d3.arc().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS)
      );
    }
    setCurrentChart(name);
  }, [name]);

  return (
    <div className="pieChart">
      <p>{name}</p>
      <div ref={ref}></div>
    </div>
  );
};

export default PieChart;
