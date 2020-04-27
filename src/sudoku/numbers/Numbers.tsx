import React from 'react'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'

import { VALID_NUMBERS } from '../definitions'
import './Numbers.css'

interface Props {
  issueNumber: (n: number) => void
}

const Numbers = (props: Props) => {
  const { issueNumber } = props
  return (
    <>
    <ButtonToolbar>
    <ButtonGroup>
      {VALID_NUMBERS.map((number: number) => (
        <Button
          key={`control${number}`}
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