import React from 'react'

import "./PeriodicElement.scss";

interface Props {
  
}

const PeriodicElement = (props: Props) => {
  
  return (
    <div style={{width: "400px", height: "400px"}}>
    <span className="periodicElement__foodPercentage">45%</span>
    <div className="round"></div>
    </div>
  )
}

export default PeriodicElement
