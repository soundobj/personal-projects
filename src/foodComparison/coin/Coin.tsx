import React from "react";

import "./Coin.scss";

interface Props {
  title: string;
  value: number;
  caption: string
}

const viewBox = 250;

const Coin = (props: Props) => {
  const { title, value, caption} = props
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      xmlSpace="preserve"
      className="coin"
    >
      <circle className="st0" cx="125" cy="120" r="115" />
      <text className="coin__value" transform="translate(70,150)">
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
      <text transform="translate(66,190)" className="coin__bottom">
        {caption}
      </text>
    </svg>
  );
};

export default Coin;
