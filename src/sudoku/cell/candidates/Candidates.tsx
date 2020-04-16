import React from 'react'

import { CandidateMap, VALID_NUMBERS } from '../../definitions'
import './Candidates.css'

interface Props {
  candidates: CandidateMap
  selected: true | undefined
}

export default (props: Props): JSX.Element => {
  const { candidates, selected } = props
  return (
    <ul className={`sudoku__cell__candidates ${selected && 'sudoku__cell__candidates--selected'} `}>
      {VALID_NUMBERS.map((number) => (
        <li className="sudoku__cell__candidates__candidate">
          {candidates[number] !== undefined && candidates[number].entered && number}
        </li>
      ))}
    </ul>
  ); 
} 