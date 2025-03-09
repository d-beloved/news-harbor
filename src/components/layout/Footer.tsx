import React from "react";
import { GithubIcon } from "../../assets/Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="max-md:flex max-md:flex-col footer footer-center p-10 bg-base-200/80 text-base-content rounded-t-xl backdrop-blur-sm transition-colors duration-50">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          NewsHarbor
        </h2>
        <p className="text-sm opacity-70 mt-2 font-bold">
          Aggregating trusted news sources to keep you informed
        </p>
      </div>

      <nav className="grid grid-flow-col gap-8">
        <a
          href="https://github.com/d-beloved/news-harbor"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover flex items-center gap-2 hover:text-primary transition-colors"
        >
          <GithubIcon />
          GitHub
        </a>
      </nav>

      <nav className="grid grid-flow-col gap-4">
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://newsapi.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            NewsAPI
          </a>
          <a
            href="https://www.theguardian.com/open-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Guardian API
          </a>
          <a
            href="https://developer.nytimes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            NYTimes API
          </a>
        </div>
      </nav>

      <aside>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} NewsHarbor
        </p>
      </aside>
    </footer>
  );
};
