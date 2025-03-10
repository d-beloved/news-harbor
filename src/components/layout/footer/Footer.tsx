import React from "react";
import { FooterBranding } from "./FooterBranding";
import { FooterLink } from "./FooterLinks";
import { GithubIcon } from "../../../assets/Icons";
import { API_LINKS } from "../../../constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-md:flex max-md:flex-col footer footer-center p-10 bg-base-200/80 text-base-content rounded-t-xl backdrop-blur-sm transition-colors duration-50">
      <FooterBranding
        title="NewsHarbor"
        description="Aggregating trusted news sources to keep you informed"
      />

      <nav className="grid grid-flow-col gap-8">
        <FooterLink
          href="https://github.com/d-beloved/news-harbor"
          icon={<GithubIcon />}
        >
          GitHub
        </FooterLink>
      </nav>

      <nav className="grid grid-flow-col gap-4">
        <div className="grid grid-flow-col gap-4">
          {API_LINKS.map(({ href, label }) => (
            <FooterLink key={href} href={href}>
              {label}
            </FooterLink>
          ))}
        </div>
      </nav>

      <aside>
        <p className="text-sm opacity-70">© {currentYear} NewsHarbor</p>
      </aside>
    </footer>
  );
};
