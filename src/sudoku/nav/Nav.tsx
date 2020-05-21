import React from "react";
import { noop } from "lodash";
// @ts-ignore
import classnames from "classnames";

import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Bin } from "../../assets/bin.svg";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Help } from "../../assets/help.svg";
import { ReactComponent as Controls } from "../../assets/controls.svg";

import Mistakes from "../mistakes/Mistakes";

import "./Nav.scss";

interface Props {
  showGameModal: () => void;
  showEndGameModal: () => void;
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

const NavItem = (props: NavItemProps) => {
  const { title, onClick, children, disabled, className } = props;
  return (
    <button
      className={classnames("sudoku__nav__item", className)}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="sudoku__nav__item__icon">{children}</div>
      <span className="sudoku__nav__item__text">{title}</span>
    </button>
  );
};

const Nav = (props: Props) => {
  const { showEndGameModal, showGameModal, mistakes, isGamePlayed } = props;
  return (
    <>
      <nav className="sudoku__nav__left">
        <NavItem title="new" onClick={showGameModal}>
          <Plus />
        </NavItem>
        <NavItem className="help" title="help" onClick={noop}>
          <Help />
        </NavItem>
        <NavItem title="keys" onClick={noop}>
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
        <NavItem title="theme" onClick={noop}>
          <Sun />
        </NavItem>
      </nav>
    </>
  );
};

export default Nav;
