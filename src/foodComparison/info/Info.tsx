import React from "react";
import { Popover } from "react-bootstrap";
import _wikilinks from "../foodWikiLinks.json";
import {
  FoodMainAttrs,
  calcWaterContentPercentage,
} from "../foodUtils/foodUtils";
import FoodImage from "../foodImage/FoodImage";
import { ReactComponent as Wikipedia } from "../assets/wikipedia-logo.svg";
import Coin from "../coin/Coin";

import "./Info.scss";

type Module = {
  default: string;
};

const links: Record<string, string> = _wikilinks;

const Info = (props: FoodMainAttrs) => {
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

  return (
    <article className="food__info">
      <Popover.Title as="h3">{food_name}</Popover.Title>
      <Popover.Content>
        <section className="">
          <div>
            <FoodImage food_name={food_name} className="food__info__image" />
            <ul>
              {infoFields.map((item) => (
                <li>
                  <dl>
                    <dt>{item.name}</dt>
                    <dd>{item.value}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Coin title="calories" value={99} caption="per 100gr" />
        <Coin
          component={
            <a
              href="https://en.wikipedia.org/wiki/Apple"
              target="new"
              title={`go to wikipedia page for ${"apple"}`}
              className="coin__wikiLogo"
            >
              <Wikipedia />
            </a>
          }
        />

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
