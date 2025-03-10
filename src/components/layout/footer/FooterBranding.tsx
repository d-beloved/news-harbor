interface BrandingProps {
  title: string;
  description: string;
}

export const FooterBranding: React.FC<BrandingProps> = ({
  title,
  description,
}) => (
  <div className="max-w-md text-center">
    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-sm opacity-70 mt-2 font-bold">{description}</p>
  </div>
);
