import React from 'react'

import { CandidateMap, VALID_NUMBERS, SameAsSelected } from '../../definitions'
import './Candidates.css'

interface Props {
  candidates: CandidateMap
  selected: true | undefined
  sameAsSelected?: SameAsSelected
}
//@TODO: use React.memo
export default (props: Props): JSX.Element => {
  const { candidates, selected, sameAsSelected } = props
  return (
    <ul
      className={`sudoku__cell__candidates ${
        selected 
          && "sudoku__cell__candidates--selected"
          || ""
      }`}
    >
      {VALID_NUMBERS.map((number) => (
        <li
          key={`candidate${number}`}
          className={`sudoku__cell__candidates__candidate ${
            sameAsSelected?.candidate === number
              ? "sudoku__cell--same-as-selected "
              : ""
          }`}
        >
          {candidates[number] !== undefined &&
            candidates[number].entered &&
            number}
        </li>
      ))}
    </ul>
  ); 
} 