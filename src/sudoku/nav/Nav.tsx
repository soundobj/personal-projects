import React, { useState } from "react";
import { noop } from "lodash";
// @ts-ignore
import classnames from "classnames";

import { ReactComponent as Plus } from "../../assets/plus.svg";
// import { ReactComponent as Bin } from "../../assets/bin.svg";
import { ReactComponent as Bin } from "../../assets/recycling-bin-freepick-red.svg";
import { ReactComponent as Help } from "../../assets/help.svg";
import { ReactComponent as Controls } from "../../assets/controls.svg";

import Mistakes from "../mistakes/Mistakes";
import ThemeSelector from "../themeSelector/ThemeSelector"

import "./Nav.scss";

interface Props {
  showGameModal: () => void;
  showEndGameModal: () => void;
  showShortcutsModal: () => void;
  mistakes: number;
  isGamePlayed: boolean;
}

interface NavItemProps {
  onClick: () => void;
  title: string;
  children: JSX.Element;
  disabled?: boolean;
  className?: string;
}

export const NavItem = (props: NavItemProps) => {
  const { title, onClick, children, disabled, className } = props;
  return (
    <button
      className={classnames("sudoku__nav__item", className)}
      onClick={onClick}
      disabled={disabled}
    >
      <figure className="sudoku__nav__item__icon">
        {children}
        <figcaption className="sudoku__nav__item__text">{title}</figcaption>
      </figure>
    </button>
  );
};

const Nav = (props: Props) => {
  const { showEndGameModal, showGameModal, mistakes, isGamePlayed, showShortcutsModal } = props;
  return (
    <>
      <nav className="sudoku__nav__left">
        <NavItem title="new" onClick={showGameModal}>
          <Plus />
        </NavItem>
        <NavItem className="help" title="help" onClick={noop}>
          <Help />
        </NavItem>
        <NavItem title="keys" onClick={showShortcutsModal}>
          <Controls />
        </NavItem>
      </nav>
      <nav className="sudoku__nav__right">
        <NavItem
          title="end"
          onClick={showEndGameModal}
          disabled={!isGamePlayed}
        >
          <Bin />
        </NavItem>
        <Mistakes mistakes={mistakes} />
        <ThemeSelector />
      </nav>
    </>
  );
};

export default Nav;
