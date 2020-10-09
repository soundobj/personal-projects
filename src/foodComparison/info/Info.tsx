import React from 'react'
import { ReactComponent as I } from "../assets/information-button.svg";

import "./Info.scss"

interface Props {
  name: string
}

const Info = (props: Props) => {
  const { name } = props
  console.error('@_info name', name);
  return (
    // <article>
    //   info
    //   {name}
    // </article>
    <I className="info" />
  )
}

export default Info
