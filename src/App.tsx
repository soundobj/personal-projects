import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import Sudoku from "./sudoku/Sudoku";
import FoodCompare from "./foodComparison/foodCompare/FoodCompare";

import "./App.css";

const history = createBrowserHistory();
const ROOT_BODY_CLASS = "index"

export const setBodyClassNameToRoute = () => {
  document.querySelector("body")?.removeAttribute("class");
  const pathname = window.location.pathname.split( '/' )[1] || ROOT_BODY_CLASS; 
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
      <Link to="/foodCompare">Food Comparison</Link>
    </li>
  </ul>
);

export const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/" component={Index} />
      <Route path="/sudoku" component={Sudoku} />
      <Route path="/foodCompare" component={FoodCompare} />
    </Router>
  );
};
