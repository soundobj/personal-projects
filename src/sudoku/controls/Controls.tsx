import React, { SyntheticEvent } from 'react'
import { Form, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import './Controls.css'

import { MoveTypes, VALID_NUMBERS } from '../definitions'

interface Props {
  editMode: MoveTypes
  setEditMode: (editMode: MoveTypes) => void
  issueNumber: (number: number) => void
}

export default (props : Props): JSX.Element => {
  const { editMode, setEditMode, issueNumber } = props
  return (
    <Form>
      <ul className="edit-mode">
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
      <ButtonToolbar>
        <ButtonGroup>
          {VALID_NUMBERS.map((number: number) => (
            <Button
              key={`control${number}`}
              onClick={(e: SyntheticEvent) => { 
                const target = e.target as HTMLElement;
                target.blur();
                issueNumber(number);
              }}
            >{number}</Button>
          ))}
        </ButtonGroup>
      </ButtonToolbar>
    </Form>
  );
}