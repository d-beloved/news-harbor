import React from "react";

export interface FilterOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  title: string;
  allOptionLabel?: string;
  testId?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  icon,
  options,
  value,
  onChange,
  title,
  allOptionLabel = "All",
  testId,
}) => {
  return (
    <div className="dropdown dropdown-center">
      <label
        tabIndex={0}
        data-testid={testId}
        className="btn btn-ghost gap-2 hover:bg-primary/10"
      >
        {icon}
        {value ? options.find((opt) => opt.id === value)?.name : label}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-56 animate-fade-in"
      >
        <li className="menu-title">
          <span>{title}</span>
        </li>
        <li>
          <a
            onClick={() => onChange("")}
            className={!value ? "active font-medium" : ""}
          >
            {allOptionLabel}
          </a>
        </li>
        {options.map((option) => (
          <li key={option.id}>
            <a
              onClick={() => onChange(option.id)}
              className={value === option.id ? "active font-medium" : ""}
            >
              {option.icon}
              {option.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
