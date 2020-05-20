import React from "react";
import { noop } from "lodash";
import { GoPlus } from "react-icons/go";
import { GiTrashCan } from "react-icons/gi";
import { GrHelp } from "react-icons/gr";
import { BsController } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";

import MenuItem from "../menuItem/MenuItem";
import Mistakes, { MistakesTypes } from "../mistakes/Mistakes";

interface Props {
  showGameModal: () => void;
  showEndGameModal: () => void;
  mistakes: number;
  isGamePlayed: boolean;
}

const Nav = (props: Props) => {
  const { showEndGameModal, showGameModal, mistakes, isGamePlayed } = props;
  return (
    <>
      <nav className="sudoku__nav__left">
        <MenuItem
          title="new"
          icon={<GoPlus className="icon__small" />}
          onClick={showGameModal}
        />
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
