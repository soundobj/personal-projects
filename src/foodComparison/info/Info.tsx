import React from "react";
import { Popover } from "react-bootstrap";
import _wikilinks from "../foodWikiLinks.json";
import { FoodMainAttrs, calcWaterContentPercentage } from "../foodUtils/foodUtils";

import "./Info.scss";

const links: Record<string, string> = _wikilinks;

const Info = (props: FoodMainAttrs) => {
  const { food_name, nf_calories, serving_weight_grams } = props;
  return (
    <>
      <Popover.Title as="h3">{food_name}</Popover.Title>
      <Popover.Content>
        <a href={links[name]} target="new">
          more
        </a>
      </Popover.Content>
    </>
  );
};

export default Info;
