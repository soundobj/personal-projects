import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Sudoku from "./sudoku/Sudoku";
import FoodCompare from "./foodComparison/foodCompare/FoodCompare";
import IndexPage from "./indexPage/IndexPage";

import "./App.css";

const history = createBrowserHistory();

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
    link: "/personal-projects/foodCompare/",
  },
  {
    thumb: `${process.env.PUBLIC_URL}/projects/sudoku.jpg`,
    title: "Sudoku",
    caption:
      "Classic puzzle game. Utilizes React Hooks, multiple difficulty levels and dark & light modes using CSS variables.",
    link: "/personal-projects/sudoku/",
  },
];

export const App = () => {
  return (
    <Router history={history}>
      <Route
        exact
        path="/personal-projects"
        component={() => <IndexPage projects={projects} />}
      />
      <Route path="/personal-projects/sudoku/" component={Sudoku} />
      <Route path="/personal-projects/foodCompare/" component={FoodCompare} />
    </Router>
  );
};
