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
        <Button disabled={disabled} variant="link" onClick={onClick} className={className}>
          {children}
        </Button>
      </OverlayTrigger>
    </>
  );
};

export default Icon;
