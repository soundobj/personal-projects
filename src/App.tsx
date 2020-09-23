import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import Sudoku from "./sudoku/Sudoku";
import FoodComposition from "./foodComparison/foodComposition/FoodComposition";

import "./App.css";

const history = createBrowserHistory();
const BODY_CLASS = "index"

export const setBodyClassNameToRoute = () => {
  document.querySelector("body")?.removeAttribute("class");
  const pathname = window.location.pathname.split( '/' )[1] || BODY_CLASS; 
  document.querySelector("body")?.classList?.add(pathname);
}

setBodyClassNameToRoute()
history.listen(setBodyClassNameToRoute)

const Index = () => (
  <ul>
    <li>
      <Link to="/sudoku">Sudoku</Link>
    </li>
    <li>
      <Link to="/food">Food Comparison</Link>
    </li>
  </ul>
);

export const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/" component={Index} />
      <Route path="/sudoku" component={Sudoku} />
      <Route path="/food" component={FoodComposition} />
    </Router>
  );
};
