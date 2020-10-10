// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";

interface Props {
  delay: number
  onMouseEnter?: () => void
  children: React.ReactNode
  component: React.ReactNode
  placement: "top" | "left" | "right" | "bottom"
}

const PopoverStickOnHover = (props: Props) => {
  const { delay, onMouseEnter, children, component, placement } = props;
  const [showPopover, setShowPopover] = useState(false);
  const childNode = useRef(null);
  let setTimeoutConst: ReturnType<typeof setTimeout>;

  useEffect(() => {
    return () => {
      if (setTimeoutConst) {
        clearTimeout(setTimeoutConst);
      }
    };
  });

  const handleMouseEnter = () => {
    setTimeoutConst = setTimeout(() => {
      setShowPopover(true);
      onMouseEnter && onMouseEnter();
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(setTimeoutConst);
    setShowPopover(false);
  };

  const displayChild = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ref: (node) => {
        childNode.current = node;
        const { ref } = child;
        if (typeof ref === "function") {
          ref(node);
        }
      },
    })
  )[0];

  return (
    <>
      {displayChild} 
      <Overlay
        show={showPopover}
        placement={placement}
        // @ts-ignore
        target={childNode}
        shouldUpdatePosition
      >
        <Popover
          onMouseEnter={() => {
            setShowPopover(true);
          }}
          onMouseLeave={handleMouseLeave}
          id="popover"
        >
          {component}
        </Popover>
      </Overlay>
    </>
  );
}

export default PopoverStickOnHover;
