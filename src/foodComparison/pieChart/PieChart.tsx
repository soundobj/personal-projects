// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./PieChart.scss";

interface Props {
  values: number[];
  width: number;
  height: number;
  // id: string;
  name: string;
}

const enterClockwise = {
  startAngle: 0,
  endAngle: 0,
};

const enterAntiClockwise = {
  startAngle: Math.PI * 2,
  endAngle: Math.PI * 2,
};

export const getRadius = (width: number, height: number) =>
  Math.min(width, height) / 2;

const PieChart = (props: Props) => {
  const ref = useRef(null);
  const { values, width, height, name } = props;
  const radius = getRadius(width, height);
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    console.error('@_ current', current);
    let playStartAnimation = true;

    if (current) {
      console.error('@_ref', ref);
      ref.current.innerHTML = '';
      playStartAnimation = false;
    }

    const color = d3.schemeSet2;
    const pie = d3.pie().sort(null);
    const arc = d3
      .arc()
      .innerRadius(radius - 120)
      .outerRadius(radius - 10);

    const svg = d3
      .select(ref.current)
      .append("svg")
      // .attr("id", "Donut-chart-render")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin");

    const path = svg
      .selectAll("path")
      .data(pie(values))
      .enter()
      .append("path")
      .attr("fill", (d, i) => color[i])
      .attr("d", arc(enterClockwise))
      .each(function (d) {
        this._current = {
          data: d.data,
          value: d.value,
          startAngle: enterClockwise.startAngle,
          endAngle: enterClockwise.endAngle,
        };
      });

      // if (playStartAnimation) {
        path.transition().duration(750).attrTween("d", arcTween);
      // }

    // d3.selectAll("input").on("change", change);

    // function change() {
    //   path = path.data(pie(dataset[this.value]));
    //   path
    //     .enter()
    //     .append("path")
    //     .attr("fill", function (d, i) {
    //       return color(i);
    //     })
    //     .attr("d", arc(enterAntiClockwise))
    //     .each(function (d) {
    //       this._current = {
    //         data: d.data,
    //         value: d.value,
    //         startAngle: enterAntiClockwise.startAngle,
    //         endAngle: enterAntiClockwise.endAngle,
    //       };
    //     }); // store the initial values

    //   path
    //     .exit()
    //     .transition()
    //     .duration(750)
    //     .attrTween("d", arcTweenOut)
    //     .remove(); // now remove any redundant arcs

    //   path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    // }

    function arcTween(a) {
      // console.error("@_arcTween");
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return arc(i(t));
      };
    }
    function arcTweenOut(a) {
      // console.error("@_arcTweenOut");
      var i = d3.interpolate(this._current, {
        startAngle: Math.PI * 2,
        endAngle: Math.PI * 2,
        value: 0,
      });
      this._current = i(0);
      return function (t) {
        return arc(i(t));
      };
    }

    setCurrent(name)
    //CLEANUP
    return function cleanup() {
      // console.error("@_ cleanup");
    };
  }, [name]);

  return (
    <div className="chart">
      <p>{name}</p>
      <div ref={ref}></div>
    </div>
  );
};

export default PieChart;
