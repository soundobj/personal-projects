import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import Sudoku from "./sudoku/Sudoku";
import FoodComposition from "./foodComparison/foodComposition/FoodComposition";

import "./App.css";

const history = createBrowserHistory()

history.listen((location) => {
  console.error('@_foo', location.pathname);
})

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
  return <Router history={history}>
    <Route exact path="/" component={Index} />
    <Route path="/sudoku" component={Sudoku} />
    <Route path="/food" component={FoodComposition} />
  </Router>
}
