interface PreferenceButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const PreferenceButton: React.FC<PreferenceButtonProps> = ({
  label,
  isSelected,
  onClick,
  variant = "primary",
}) => (
  <button
    onClick={onClick}
    className={`btn btn-sm normal-case transition-all duration-200 ${
      isSelected
        ? `btn-${variant} shadow-lg hover:shadow-xl`
        : `btn-ghost hover:bg-${variant}/10`
    }`}
  >
    {label}
  </button>
);
