import React from "react";
import { GiTrashCan } from "react-icons/gi";
import { IoIosHourglass } from "react-icons/io";
import { GrSave } from "react-icons/gr";
import { GoPlus } from "react-icons/go";

import "./Menu.css";

interface Props {}

const Menu = (props: Props) => {
  return (
    <nav className="sudoku__nav">
      <ul className="sudoku__nav__left">
        <li>
          <div className="sudoku__nav__item__circle">
            <GoPlus className="sudoku__nav__item sudoku__nav__item__small" />
          </div>
        </li>
      </ul>
      <ul className="sudoku__nav__right">
        <li>
          <div className="sudoku__nav__item__circle">
            <GiTrashCan className="sudoku__nav__item" />
          </div>
        </li>
        <li>
          <div className="sudoku__nav__item__circle">
            <IoIosHourglass className="sudoku__nav__item" />
          </div>
        </li>
        <li>
          <div className="sudoku__nav__item__circle">
            <GrSave className="sudoku__nav__item sudoku__nav__item__small" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
