import React from "react";
import { noop } from "lodash";
import { GoPlus } from "react-icons/go";
import { GiTrashCan } from "react-icons/gi";
import { GrHelp } from "react-icons/gr";
import { BsController } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";

import { ReactComponent as Plus } from "../../assets/plus.svg";

import MenuItem from "../menuItem/MenuItem";
import Mistakes, { MistakesTypes } from "../mistakes/Mistakes";

import "./Nav.scss"

interface Props {
  showGameModal: () => void;
  showEndGameModal: () => void;
  mistakes: number;
  isGamePlayed: boolean;
}

interface NavItemProps {
  onClick: () => void
  title: string
  children: JSX.Element
}

const NavItem = (props: NavItemProps) => {
  const { title, onClick, children } = props;
  return (
    <button className="sudoku__nav__item" onClick={onClick}>
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
        <MenuItem
          title="help"
          icon={<GrHelp className="icon__smaller" />}
          onClick={noop}
        />
        <MenuItem
          title="keys"
          icon={<BsController className="icon__small" />}
          onClick={noop}
        />
      </nav>
      <nav className="sudoku__nav__right">
        <MenuItem
          disabled={!isGamePlayed}
          title="end"
          icon={<GiTrashCan className="icon" />}
          onClick={showEndGameModal}
        />
        <MenuItem
          title="fails"
          icon={<Mistakes mistakes={mistakes} />}
          bgClass={MistakesTypes[mistakes]}
        />
        <MenuItem
          title="theme"
          icon={<RiSunLine className="icon__small" />}
          onClick={noop}
        />
      </nav>
    </>
  );
};

export default Nav;
