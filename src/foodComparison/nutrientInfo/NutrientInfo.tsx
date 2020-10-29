import React from "react";
import { Legend } from "../foodUtils/foodUtils";
import classnames from "classnames";
import { Image } from "../foodInfo/FoodInfo";
import "./NutrientInfo.scss";

const NutrientInfo = (props: { info: Legend; foods: string[] }) => {
  const { info, foods } = props;
  console.error("@_props", props);
  return (
    <article className="NutrientInfo">
      <header className="NutientInfo__header">
        <h3 className="NutrientInfo__header__title">
          {info.title} per 100 grams:
        </h3>
        <table className="NutrientInfo__header__table">
          <tr>
            {info.values.map((value, i) => (
              <th
                className={classnames("NutrientInfo__header__table__heading", {
                  dark: i === 1,
                })}
              >
                {value.food_name}
              </th>
            ))}
            <th className="NutrientInfo__header__table__heading">GDA</th>
          </tr>
          <tr>
            {info.values.map((value) => (
              <td>
                {value.weightPer100gr}
                {info.unit}
              </td>
            ))}
            <td>
              {info.fda_daily_value}
              {info.unit}
            </td>
          </tr>
        </table>
      </header>
      <section className="NutrientInfo__foods">
        <h3 className="NutrientInfo__foods__title">Foods high in {info.title}:</h3>
        <ul className="NutrientInfo__foods__list">
          {foods.map((food, i) => (
            <li key={`${food}${i}`} className="NutrientInfo__foods__list__item">
              <dl>
                <dt>
                  <Image
                    food={food}
                    className="NutrientInfo__foods__list__item__image"
                  />
                </dt>
                <dd>{food}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>
      <a href={info?.url} className="NutrientInfo__more">
        more on {info.title}
      </a>
    </article>
  );
};

export default NutrientInfo;
