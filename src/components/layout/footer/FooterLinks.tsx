interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  icon,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`link link-hover ${icon ? "flex items-center gap-2 hover:text-primary transition-colors" : ""}`}
  >
    {icon}
    {children}
  </a>
);
