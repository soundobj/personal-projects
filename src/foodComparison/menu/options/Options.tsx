import React from "react";
import { startCase } from "lodash";

import { OptionType } from "../Menu";

export interface GroupedOption {
  label: string;
  options: OptionType[];
}

export type Items = Record<string, string[]>;

export const createGroupedOptions = (options: Items): GroupedOption[] =>
  Object.keys(options).map<GroupedOption>((group: string) => ({
    label: startCase(group),
    options: options[group].map<OptionType>((value: string) => ({
      label: startCase(value),
      value,
    })),
  }));

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

export const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span>{data.options.length}</span>
  </div>
);
