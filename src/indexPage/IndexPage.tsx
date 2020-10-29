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
            <li className="IndexPage__projects__item">
              <Link to={project.link}>
                <MediaObject {...project} />
              </Link>
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
