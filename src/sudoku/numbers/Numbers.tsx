import React from 'react'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'

import { VALID_NUMBERS } from '../lib/definitions'
import './Numbers.scss'

interface Props {
  issueNumber: (n: number) => void
  isGamePlayed: boolean
}

const Numbers = (props: Props) => {
  const { issueNumber, isGamePlayed } = props
  return (
    <>
    <ButtonToolbar>
    <ButtonGroup className="sudoku__controls__numbers">
      {VALID_NUMBERS.map((number: number) => (
        <Button
          key={`control${number}`}
          disabled={!isGamePlayed}
          onClick={(e: React.SyntheticEvent) => { 
            const target = e.target as HTMLElement;
            target.blur();
            issueNumber(number);
          }}
        >{number}</Button>
      ))}
    </ButtonGroup>
  </ButtonToolbar>
  </>
  )
}

export default Numbers