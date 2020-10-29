import React from 'react'
import "./MediaObject.scss"

export interface MediaObjectProps {
  thumb: string,
  title: string,
  caption: string | Element,
  link: string
}

const MediaObject = (props: MediaObjectProps) => {
  const { thumb, title, caption } = props
  return (
    <article className="MediaObject">
      <img src={thumb} alt={`go to ${title}`} className="MediaObject__img"/>
      <section className="MediaObject__content">
        <h3 className="MediaObject__content__title">{title}</h3>
        <div className="MediaObject__content__caption">{caption}</div>
      </section>
    </article>
  )
}

export default MediaObject
