import React, { useState, useEffect } from "react";
import { Popover } from "react-bootstrap";
import _wikilinks from "../foodWikiLinks.json";
import {
  FoodMainAttrs,
  calcWaterContentPercentage,
} from "../foodUtils/foodUtils";
import { spacesToHyphen } from "../getFoodItem/getFoodItem";
import foo from "../assets/image-placeholder.svg";

import "./Info.scss";

type Module = {
  default: string;
};

const links: Record<string, string> = _wikilinks;

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
            className="food__info__image"
            src={(image && image.default) || foo}
            alt={food_name}
          />
          <ul>
            <li>
              <dl>
                <dd></dd>
                <dt></dt>
              </dl>
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
