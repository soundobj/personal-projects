import React from "react";
import { components } from "react-select";
import { MenuProps, ValueType } from "react-select";

export type OptionType = { label: string; value: string };

const Menu = (props: MenuProps<OptionType>) => {
  const propsValue = props.getValue();
  const optionSelectedLength =
    (Array.isArray(propsValue) && propsValue.length) || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < 2 ? (
        props.children
      ) : (
        <div style={{ margin: 15 }}>Max limit achieved</div>
      )}
    </components.Menu>
  );
};

export const isValidNewOption = (
  inputValue: string,
  selectValue: ValueType<OptionType>
) =>
  inputValue.length > 0 && Array.isArray(selectValue) && selectValue.length < 2;

export default Menu;
