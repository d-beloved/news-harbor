interface LogoProps {
  text: string;
}

export const Logo: React.FC<LogoProps> = ({ text }) => (
  <span className="btn btn-ghost cursor-default text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    {text}
  </span>
);
