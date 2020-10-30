import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import Sudoku from "./sudoku/Sudoku";
import FoodCompare from "./foodComparison/foodCompare/FoodCompare";
import IndexPage from "./indexPage/IndexPage";

import "./App.css";

const history = createBrowserHistory();
const ROOT_BODY_CLASS = "index";

export const setBodyClassNameToRoute = () => {
  document.querySelector("body")?.removeAttribute("class");
  const pathname = window.location.pathname.split("/")[1] || ROOT_BODY_CLASS;
  document.querySelector("body")?.classList?.add(pathname);
};

setBodyClassNameToRoute();
history.listen(setBodyClassNameToRoute);

const projects = [
  {
    thumb: `${process.env.PUBLIC_URL}/projects/food-compare.jpg`,
    title: "Food Comparison tool",
    caption: (
      <p>
        Compare fruits and vegetables nutrient composition: Leveraging the{" "}
        <span title="https://developer.nutritionix.com/">Nutritionix API</span>,
        D3.js and react-select
      </p>
    ),
    link: "/foodCompare",
  },
  {
    thumb: `${process.env.PUBLIC_URL}/projects/sudoku.jpg`,
    title: "Sudoku",
    caption:
      "Classic puzzle game. Utilizes React Hooks, multiple difficulty levels and dark & light modes using CSS variables.",
    link: "/sudoku",
  },
];

export const App = () => {
  return (
    <Router history={history}>
      <Route
        exact
        path="/"
        component={() => <IndexPage projects={projects} />}
      />
      <Route path="/sudoku" component={Sudoku} />
      <Route path="/foodCompare" component={FoodCompare} />
    </Router>
  );
};
