import React from 'react'
import { Form } from 'react-bootstrap'

import { MoveTypes } from '../definitions'

interface Props {
  editMode: number,
  setEditMode: (mode: number) => void
}

const EditMode = (props: Props) => {
  const { editMode, setEditMode } = props
  return <ul className="edit-mode">
  <li>
    <Form.Check
      checked={editMode === MoveTypes.NUMBER}
      type="radio"
      id="numberMode"
      label="Number Mode"
      onChange={() => setEditMode(MoveTypes.NUMBER)}
    />
  </li>
  <li>
    <Form.Check
      checked={editMode === MoveTypes.CANDIDATE}
      type="radio"
      id="candidateMode"
      label="Candidate Mode"
      onChange={() => setEditMode(MoveTypes.CANDIDATE)}
    />
  </li>
</ul>
}

export default EditMode