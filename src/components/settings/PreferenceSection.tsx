import { PreferenceButton } from "./PreferenceButton";

interface PreferenceSectionProps {
  title: string;
  options: { id: string; name: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  variant?: "primary" | "secondary";
}

export const PreferenceSection: React.FC<PreferenceSectionProps> = ({
  title,
  options,
  selectedValues,
  onToggle,
  variant = "primary",
}) => (
  <div>
    <h4 className="font-medium mb-3 text-sm text-base-content/70">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <PreferenceButton
          key={option.id}
          label={option.name}
          isSelected={selectedValues.includes(option.id)}
          onClick={() => onToggle(option.id)}
          variant={variant}
        />
      ))}
    </div>
  </div>
);
