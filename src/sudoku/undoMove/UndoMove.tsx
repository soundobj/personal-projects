import React from 'react'
import { Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import { Move } from '../lib/definitions'

interface Props {
  moveHistory: Move[],
  undoMove: () => {}
}

const UndoMove = (props: Props) => {
  const { moveHistory, undoMove } = props
  return (
    <Button
      disabled={isEmpty(moveHistory)}
      onClick={undoMove}
    >Undo</Button>
  )
}

export default UndoMove