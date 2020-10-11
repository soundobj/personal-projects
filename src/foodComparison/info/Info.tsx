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
import calories from "../assets/calories.svg";

import "./Info.scss";

type Module = {
  default: string;
};

const links: Record<string, string> = _wikilinks;

const Info = (props: FoodMainAttrs) => {
  const [image, setImage] = useState<Module>();
  const { food_name, nf_calories, serving_weight_grams } = props;

  const infoFields = [
    {
      name: "Serving weight",
      value: `${serving_weight_grams}gr`,
    },
    {
      name: "Calories / 100gr",
      value: Math.round(nf_calories),
    },
    {
      name: "Water content",
      value: `${calcWaterContentPercentage(props)}%`,
    },
  ];

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
          <div>
            <img
              className="food__info__image fluid-img-ratio"
              src={(image && image.default) || placeholder}
              alt={food_name}
            />
            <ul>
              {infoFields.map((item) => (
                <li>
                  <dd>
                    <dl>{item.name}</dl>
                    <dd>{item.value}</dd>
                  </dd>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <footer>
          <a href={links[food_name]} target="new">
            find out more
          </a>
        </footer>
      </Popover.Content>
    </article>
  );
};

export default Info;
