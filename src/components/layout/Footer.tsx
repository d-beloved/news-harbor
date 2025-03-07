import React from "react";
import { Link } from "react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/settings" className="link link-hover">
            Settings
          </Link>
          <a
            href="https://github.com/d-beloved/news-harbor"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            GitHub
          </a>
        </div>
      </nav>
      <nav>
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
        <p>Copyright © {new Date().getFullYear()} - NewsHarbor</p>
      </aside>
    </footer>
  );
};
