import React from "react";

import "./Coin.scss";

interface Props {
  title?: string;
  value?: number;
  caption?: string;
  className?: string;
  component?: React.ReactElement;
}

const Coin = (props: Props) => {
  const { title, value, caption, className, component } = props;
  return (
    <div className="coin__wrapper">
      <svg
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
          className={`coin__circle ${className || ""}`}
          cx="125"
          cy="125"
          r="120"
        />
        {title && (
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
        )}
      </svg>
      {value && <span className="absolute-center coin__value">{value}</span>}
      {caption && (
        <span className="absolute-center coin__caption">{caption}</span>
      )}
      {component && <span className="absolute-center">{component}</span>}
    </div>
  );
};

export default Coin;
