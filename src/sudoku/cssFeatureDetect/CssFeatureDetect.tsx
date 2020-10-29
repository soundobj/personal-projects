import React, { useRef, useEffect } from 'react'

interface Props {
  feature: string
  onDoesSupport: () => void
  onDoesNotSupport: () => void
}

const CssFeatureDetect = (props: Props) => {
  const { feature, onDoesSupport, onDoesNotSupport } = props
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof element.current.style[feature] === 'string') {
      onDoesSupport()
    } else {
      onDoesNotSupport()
    }
  }, [])
  return <div style={{display: "none"}} ref={element} />
}

export default CssFeatureDetect