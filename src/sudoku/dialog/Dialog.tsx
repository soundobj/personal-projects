import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export type DialogContent = { header: string; component: JSX.Element }

interface Props {
  onEnter: () => void
  onEscapeKeyDown: () => void
  onHide: () => void
  content: DialogContent
  show: boolean
}

const Dialog = (props: Props) => {
  const { onEscapeKeyDown, onHide, content } = props
  
  if (!content) {
    return null
  }

  return(
    <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton onHide={onEscapeKeyDown}>
      <Modal.Title id="contained-modal-title-vcenter">
        {content.header}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {content.component}
    </Modal.Body>
    <Modal.Footer>
      <Button
        onClick={() => {
          onHide();
          onEscapeKeyDown();
        }}
      >
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default Dialog