import React, { useState } from "react";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Moon } from "../../assets/moon-vectors-market.svg";

import {
  ROOT_HTML_THEME_ATTRIBUTE,
  LOCAL_STORAGE_KEYS,
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

interface Props {
  theme?: Themes
  setTheme: (theme: Themes) => void
}

const ThemeSelector = (props: Props) => {
  const { theme, setTheme } = props

  if (!theme) {
    return null;
  }

  return (
    <NavItem
      title="theme"
      onClick={() => {
        if (theme === Themes.DARK) {
          setRootCSSProp(ROOT_HTML_THEME_ATTRIBUTE, Themes.LIGHT);
          localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, Themes.LIGHT)
          setTheme(Themes.LIGHT);
        } else {
          setRootCSSProp(ROOT_HTML_THEME_ATTRIBUTE, Themes.DARK);
          setTheme(Themes.DARK);
          localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, Themes.DARK)
        }
      }}
    >
      {theme === Themes.DARK ? <Moon className="sudoku__themeSelector__moon" /> : <Sun />}
    </NavItem>
  );
};

export default ThemeSelector;
