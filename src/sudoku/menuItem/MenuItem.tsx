import React from "react";
import "./MenuItem.scss";

interface Props {
  icon: React.ReactElement;
  onClick?: () => void;
  title: string;
  disabled?: boolean;
  bgClass?: string;
}

const Content = (props: Pick<Props, "icon" | "title" | "bgClass">) => {
  const { icon, title, bgClass } = props;
  return (
    <>
      <div className={`sudoku__menu__item__circle ${bgClass ? bgClass : ""}`}>
        {icon}
      </div>
      <h5 className="sudoku__menu__item__title">{title}</h5>
    </>
  );
};

const MenuItem = (props: Props) => {
  const { onClick, disabled } = props;
  if (onClick) {
    return (
      <button
        className="sudoku__menu__item"
        disabled={disabled}
        onClick={onClick}
      >
        <Content {...props} />
      </button>
    );
  } else {
    return (
      <div className="sudoku__menu__item">
        <Content {...props} />
      </div>
    );
  }
};

export default MenuItem;
