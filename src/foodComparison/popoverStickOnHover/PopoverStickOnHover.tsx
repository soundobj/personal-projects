import React, { useEffect, useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";

interface Props {
  delay: number;
  onMouseEnter?: () => void;
  children: React.ReactNode;
  component: React.ReactNode;
  placement: "top" | "left" | "right" | "bottom";
}

const PopoverStickOnHover = (props: Props) => {
  const { delay, onMouseEnter, children, component, placement } = props;
  const [showPopover, setShowPopover] = useState(false);
  const childNode = useRef<React.ReactNode>(null);
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

  // we decorate React.Children with functionality
  const displayChild = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: (node: React.ReactNode) => {
          childNode.current = node;
          //@ts-ignore
          const { ref } = child;
          if (typeof ref === "function") {
            ref(node);
          }
        },
      });
    }
  });

  return (
    <>
      {displayChild?.length && displayChild[0]}
      <Overlay
        show={showPopover}
        placement={placement}
        // @ts-ignore
        target={childNode}
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
};

export default PopoverStickOnHover;
