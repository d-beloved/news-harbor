import React from "react";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
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
          © {new Date().getFullYear()} NewsHarbor - Aggregating Quality News
        </p>
      </aside>
    </footer>
  );
};
