import React, { useState, useEffect } from "react";
import { Popover } from "react-bootstrap";
import _wikilinks from "../foodWikiLinks.json";
import {
  FoodMainAttrs,
  calcWaterContentPercentage,
} from "../foodUtils/foodUtils";
import { spacesToHyphen } from "../getFoodItem/getFoodItem";
import placeholder from "../assets/image-placeholder.svg";
import drop from "../assets/drop.svg";

import "./Info.scss";

type Module = {
  default: string;
};

const links: Record<string, string> = _wikilinks;

const WaterGraphic = (props: {value: number}) => {
  console.error('@_val',props.value);
  return (<dl>
    <dd className="food__info__water">
        <img src={drop} className="food__info__water__img center fluid-img-ratio" />
      <span className="food__info__water__percentage absolute-center">{`${props.value}%`}</span>
    </dd>
    <dt className="food__info__water__legend">water</dt>
  </dl>)
};

const Info = (props: FoodMainAttrs) => {
  const [image, setImage] = useState<Module>();
  const { food_name, nf_calories, serving_weight_grams } = props;

  useEffect(() => {
    try {
      import(
        `${
          process.env["REACT_APP_FOOD_COMPARISON_ROOT_FILE"]
        }thumbs/${spacesToHyphen(food_name)}.jpg`
      ).then((img: Module) => {
        setImage(img);
      });
    } catch (error) {}
  }, [food_name]);

  return (
    <article className="food__info">
      <Popover.Title as="h3">{food_name}</Popover.Title>
      <Popover.Content>
        <section className="">
          <img
            className="food__info__image fluid-img-ratio"
            src={(image && image.default) || placeholder}
            alt={food_name}
          />
          <ul>
            <li>
              <WaterGraphic value={calcWaterContentPercentage(props)} />
            </li>
          </ul>
        </section>
        <footer>
          <a href={links[food_name]} target="new">
            more
          </a>
        </footer>
      </Popover.Content>
    </article>
  );
};

export default Info;
