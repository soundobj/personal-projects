import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";

import { VALID_NUMBERS } from "../lib/definitions";
import "./RandomNumber.scss"

interface Props {
  interval: number;
}

const RandomNumber = (props: Props) => {
  let numbers = shuffle(VALID_NUMBERS)
  const [number, setNumber] = useState(numbers.pop());

  const setRandomNumber = () => {
    if (!numbers.length) {
      numbers = shuffle(VALID_NUMBERS)
    }
    setNumber(numbers.pop())
  }

  useEffect(() => {
    const interval = setInterval(setRandomNumber, props.interval);
    return function cleanup() {
      window.clearInterval(interval);
    }
  }, [])

  return <span className="sudoku__random__number">{number}</span>;
};

export default RandomNumber;
