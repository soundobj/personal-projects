import React, { useState } from "react";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Moon } from "../../assets/moon-vectors-market.svg";

import {
  ROOT_HTML_THEME_ATTRIBUTE,
  COLOR_MODE_KEY,
  Themes,
} from "../lib/definitions";
import { NavItem } from "../nav/Nav";

import "./ThemeSelector.scss";

export const getRootCSSProp = (prop: string): string => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    prop
  );
  if (response.length) {
    response = response.replace(/\'|"/g, "").trim();
  }
  return response;
};

export const setRootCSSProp = (prop: string, value: string) => {
  document.documentElement.setAttribute(prop, value);
};

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(
    getRootCSSProp(COLOR_MODE_KEY)
  );

  return (
    <NavItem
      title="theme"
      onClick={() => {
        if (currentTheme === Themes.DARK) {
          setRootCSSProp(ROOT_HTML_THEME_ATTRIBUTE, Themes.LIGHT);
          setCurrentTheme(Themes.LIGHT);
        } else {
          setRootCSSProp(ROOT_HTML_THEME_ATTRIBUTE, Themes.DARK);
          setCurrentTheme(Themes.DARK);
        }
      }}
    >
      {currentTheme === Themes.DARK ? <Moon className="sudoku__themeSelector__moon" /> : <Sun />}
    </NavItem>
  );
};

export default ThemeSelector;
