import React from "react";
import { PeriodicElement as _PeriodicElement } from "../foodUtils/foodUtils";

import "./PeriodicElement.scss";

export interface Props extends _PeriodicElement {
  children: React.ReactNode;
}

const Link = (props: { children: React.ReactElement; url: string }) => (
  <a href={props.url} target="new" className="periodicElement__link">
    {props.children}
  </a>
);

const PeriodicElement = (props: Props) => {
  const { name, element, state, url, color, children } = props;
  return (
    <div className="outer">
      <div className="inner">
        <article className="periodicElement" style={{ backgroundColor: color }}>
          <Link url={url}>
            <>
              <h1 className="periodicElement__name">{name}</h1>
              <span className={`periodicElement__state__${state}`} />
            </>
          </Link>
          <Link url={url}>
            <h3 className="periodicElement__element">{element}</h3>
          </Link>
          <footer className="periodicElement__footer">{children}</footer>
        </article>
      </div>
    </div>
  );
};

export default PeriodicElement;
