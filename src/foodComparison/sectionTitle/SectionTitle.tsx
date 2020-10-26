import React from "react";

import "./SectionTitle.scss";

interface Props {
  content: string | React.ReactChild;
}

const SectionTitle = (props: Props) => (
  <h1 className="SectionTitle">{props.content}</h1>
);

export default SectionTitle;
