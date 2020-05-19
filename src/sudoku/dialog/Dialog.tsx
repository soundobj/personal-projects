import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import "./Dialog.scss"

export type DialogContent = {
  header: string | JSX.Element ;
  component: JSX.Element;
  className?: string;
  CTALabel?: string
};

interface Props {
  onEnter: () => void
  onEscapeKeyDown: () => void
  onHide: () => void
  content: DialogContent
  show: boolean
  CTALabel?: string
}

const Dialog = (props: Props) => {
  const { onEscapeKeyDown, onHide, content } = props
  
  if (!content) {
    console.error('@_no content',);
    return null
  }

  return(
    <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    dialogClassName={content.className}
  >
    <Modal.Header closeButton onHide={onEscapeKeyDown} className="modal__header">
      <Modal.Title id="contained-modal-title-vcenter">
        {content.header}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {content.component}
    </Modal.Body>
    <Modal.Footer>
      <button
        className="modal__cancel"
        onClick={() => {
          onHide();
          onEscapeKeyDown();
        }}
      >
        {content.CTALabel || 'Cancel'}
      </button>
    </Modal.Footer>
  </Modal>
  )
}

export default Dialog