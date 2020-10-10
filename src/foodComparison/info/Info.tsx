import React from "react";
import { Popover } from "react-bootstrap";
import PopoverStickOnHover from "../popoverStickOnHover/PopoverStickOnHover";
import { ReactComponent as Icon } from "../assets/information-button.svg";
import _wikilinks from "../foodWikiLinks.json"

import "./Info.scss";

const links: Record<string, string> = _wikilinks; 

interface Props {
  name: string;
}

const Info = (props: Props) => {
  const { name } = props;
  return (
    <PopoverStickOnHover
      delay={500}
      placement="bottom"
      onMouseEnter={() => console.error("@_ enterMouse")}
      component={
        <>
          <Popover.Title as="h3">{name}</Popover.Title>
          <Popover.Content>
            <a href={links[name]} target="new">more</a>
          </Popover.Content>
        </>
      }
    >
      <Icon className="info" />
    </PopoverStickOnHover>
  );
};

export default Info;
