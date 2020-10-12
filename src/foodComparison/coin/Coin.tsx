//@ts-nocheck
import React, { DOMElement, useEffect, useRef } from "react";

import "./Coin.scss";

interface Props {
  title: string;
  value: number;
  caption: string;
  fill: string;
}

const strokeWidth = 10;

const centerText = (parentWidth: number, textWidth: number, offSet: number) =>
  parentWidth / 2 - textWidth / 2 + offSet;

const translate = (x: number, y: number) => `translate(${x},${y})`;

const Coin = (props: Props) => {
  const { title, value, caption, fill } = props;
  const viewBoxRef = useRef();
  const valueRef = useRef();
  const captionRef = useRef<React.SVGAttributes<Text>>(null);

  useEffect(() => {
    const viewBox = viewBoxRef.current.getBoundingClientRect();
    const valueWidth =
      (valueRef.current && valueRef.current.getBoundingClientRect().width) || 0;
    const captionWidth =
      (captionRef.current &&
        captionRef.current.getBoundingClientRect().width) ||
      0;

    valueRef.current.setAttribute(
      "transform",
      translate(centerText(viewBox.width, valueWidth, strokeWidth), 155)
    );

    captionRef.current.setAttribute(
      "transform",
      translate(centerText(viewBox.width, captionWidth, strokeWidth), 190)
    );
  }, []);

  return (
    <svg
      ref={viewBoxRef}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={`0 0 250 250`}
      xmlSpace="preserve"
      className="coin"
    >
      <circle
        className="coin__circle"
        cx="125"
        cy="125"
        r="120"
        style={{
          fill,
          strokeWidth,
        }}
      />
      <text
        className="coin__value"
        ref={valueRef}
      >
        {value}
      </text>
      <g id="top">
        <path
          d="M47,125.5c-0.6-104,156.4-105.3,157,0"
          fill="transparent"
          id="coinTitle"
        />
        <text textAnchor="middle">
          <textPath
            xlinkHref="#coinTitle"
            className="coin__top"
            startOffset="50%"
          >
            {title}
          </textPath>
        </text>
      </g>
      <text ref={captionRef} className="coin__caption">
        {caption}
      </text>
    </svg>
  );
};

export default Coin;
