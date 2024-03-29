import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Sudoku from "./sudoku/Sudoku";
import Tetris from "./tetris/Tetris";
import FoodCompare from "./foodComparison/foodCompare/FoodCompare";
import IndexPage from "./indexPage/IndexPage";
import Back from './back/Back';

import "./App.css";

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
  {
    thumb: `${process.env.PUBLIC_URL}/projects/tetris.jpg`,
    title: "Tetris",
    caption:
      "Classic arcade game. Multiple difficulty. Spring animations.",
    link: "/tetris",
  },
  {
    thumb: `${process.env.PUBLIC_URL}/GitHub-Mark-120px-plus.png`,
    title: "Github",
    caption: "Take a peek a some personal projects.",
    url: "https://github.com/soundobj?tab=repositories",
  },
];

export const App = () => {
  return (
    <HashRouter basename="/">
      <Route
        exact
        path="/"
        component={() => <IndexPage projects={projects} />}
      />
      <Route path="/sudoku" component={Sudoku} />
      <Route path="/foodCompare" component={FoodCompare} />
      <Route path="/tetris" component={Tetris} />
      <Back />
    </HashRouter>
  );
};
