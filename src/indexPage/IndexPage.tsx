import React from "react";
import { Link } from "react-router-dom";
import MediaObject, { MediaObjectProps } from "../mediaObject/MediaObject";

import "./IndexPage.scss";

interface Props {
  projects: MediaObjectProps[];
}

const IndexPage = (props: Props) => {
  const { projects } = props;
  return (
    <article className="IndexPage">
      <header className="IndexPage__header">
        <h1 className="IndexPage__header__title">UI Works</h1>
      </header>
      <main className="IndexPage__main">
        <ul className="IndexPage__projects">
          {projects.map((project) => (
            <li key={project.title} className="IndexPage__projects__item">
              {project.link && (
                <Link
                  to={project.link}
                  className="IndexPage__projects__item__link"
                >
                  <MediaObject {...project} />
                </Link>
              )}
              {project.url && (
                <a href={project.url} target="new" className="IndexPage__externalLink">
                  <MediaObject {...project} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </main>
      <footer className="IndexPage__footer">
        <a href="mailto:soundobj@yahoo.com" className="IndexPage__footer__mail">
          soundobj@yahoo.com
        </a>
      </footer>
    </article>
  );
};

export default IndexPage;
