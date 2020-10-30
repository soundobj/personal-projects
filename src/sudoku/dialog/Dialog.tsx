import React from "react";
import { Modal, Button } from "react-bootstrap";
//@ts-ignore
import classnames from "classnames";

import "./Dialog.scss";

export type DialogContent = {
  header: string | JSX.Element;
  component: JSX.Element;
  className?: string;
  CTALabel?: string;
};

interface Props {
  onEnter: () => void;
  onEscapeKeyDown: () => void;
  onHide: () => void;
  content: DialogContent;
  show: boolean;
  CTALabel?: string;
  hideCloseButton?: boolean;
}

const Dialog = (props: Props) => {
  const { onEscapeKeyDown, onHide, content } = props;
  // hideCloseButton is not present in <Modal> interface so capture the other params in rest var
  const { hideCloseButton, ...rest} = props 

  if (!content) {
    return null;
  }

  return (
    <Modal
      {...rest}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={classnames("sudoku__dialog", content.className)}
    >
      <Modal.Header
        closeButton={!hideCloseButton}
        onHide={onEscapeKeyDown}
        className="modal__header"
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {content.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{content.component}</Modal.Body>
      {!hideCloseButton && (
        <Modal.Footer>
          <button
            className="modal__cancel"
            onClick={() => {
              onHide();
              onEscapeKeyDown();
            }}
          >
            {content.CTALabel || "Cancel"}
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Dialog;
