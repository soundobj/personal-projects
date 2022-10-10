import React, { useRef, useEffect } from 'react';
import { animateValue, easeInQuad } from '../lib/springAnimation/animateValue';

const Score = (props: Score) => {
  const { score, lastScore, className } = props;
  const numberRef = useRef<HTMLDivElement>(null);

  const onValueUpdate = (value: number) => {
    if (numberRef && numberRef.current?.innerHTML) {
      numberRef.current.innerHTML = `${value}`;
    }
  };

  useEffect(() => {
    animateValue(lastScore, score, 500, onValueUpdate, easeInQuad);
  }, [score, lastScore]);

  return (
    <dl>
      <dt>score</dt>
      <dd>
        <span ref={numberRef} className={className}>
          {score}
        </span>
      </dd>
    </dl>
  )
}

type Score = {
  score: number,
  lastScore: number
  scoreMessage?: string,
  className: string,
}

export default Score;