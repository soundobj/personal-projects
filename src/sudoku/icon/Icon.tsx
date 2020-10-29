import React from 'react'
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import "./Icon.css";

interface Props {
  title: string;
  className?: string;
  onClick?: () => void;
  children: any;
  disabled?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right"
}

const Icon = (props: Props) => {
  const { title, onClick, children, tooltipPosition, disabled, className } = props;
  const position = tooltipPosition || "top"
  return (
    <>
      <OverlayTrigger
        key={`${title}`}
        placement={position}
        overlay={<Tooltip id={`tooltip-${position}`}>{title}</Tooltip>}
      >
        <button disabled={disabled} onClick={onClick} className={className}>
          {children}
        </button>
      </OverlayTrigger>
    </>
  );
};

export default Icon;
