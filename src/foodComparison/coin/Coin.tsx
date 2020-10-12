//@ts-nocheck
import React from "react";

import "./Coin.scss";

interface Props {}

const Coin = (props: Props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 595.3 841.9"
      xmlSpace="preserve"
    >
      <g id="Layer_1">
        <g>
          <circle className="st0" cx="322" cy="313.9" r="136" />
        </g>
        <text
          transform="matrix(1.154 0 0 1 251.413 348.926)"
          className="st2 st3"
        >
          89
        </text>
      </g>
      <g id="top">
        <path
          className="st1"
          id="topCurve"
          d="M213.3,305.7c3.6-57.2,51.2-102.6,109.3-102.6c58.4,0,106.2,45.9,109.4,103.5c0.3,0,0.5,0,0.8-0.1
          c-3.2-58-51.4-104.2-110.2-104.2c-58.5,0-106.6,45.8-110.1,103.5C212.8,305.7,213.1,305.7,213.3,305.7z"
          strokeOpacity="0"
          fill="transparent"
        />
        <text width="500" textAnchor="middle">
          <textPath xlinkHref="#topCurve" className="topText" startOffset="25%">
            CALORIES
          </textPath>
        </text>
      </g>
      <g id="bottom">
        <path
          className="st1"
          id="bottomCurve"
          d="M432.1,320.8c-3.6,57.7-51.6,103.5-110.1,103.5c-58.8,0-107-46.2-110.2-104.2c0.3,0,0.5,0,0.8-0.1
          c3.2,57.6,51,103.5,109.4,103.5c58.1,0,105.7-45.4,109.3-102.6C431.6,320.8,431.9,320.8,432.1,320.8z"
          strokeOpacity="0"
          fill="transparent"
        />
         <text width="500" textAnchor="middle">
          <textPath xlinkHref="#bottomCurve" className="topText" startOffset="25%" side="right" >
            per 100gr
          </textPath>
        </text>
      </g>
    </svg>
  );
};

//M 500,140 C 200,140 200,190 500,190
//M 500,190 C  200,190 200,140 500,140

export default Coin;
