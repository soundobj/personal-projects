import React from "react";

import "./PeriodicElement.scss";

interface Props {
  name: string;
  element: string;
  state: "solid" | "liquid" | "gas";
  url: string;
  backgroundColor: string;
  children: React.ReactNode;
}

const PeriodicElement = (props: Props) => {
  const { name, element, state, url, backgroundColor, children } = props;
  return (
    <div className="outer">
      <article className="periodicElement inner" style={{ backgroundColor }}>
        <a href={url} target="new" className="periodicElement__link">
          <h1 className="periodicElement__name">{name}</h1>
          <span className={`periodicElement__state__${state}`} />
          <h3 className="periodicElement__element">{element}</h3>
        </a>
        <footer className="periodicElement__footer">{children}</footer>
      </article>
    </div>
  );
};

export default PeriodicElement;
