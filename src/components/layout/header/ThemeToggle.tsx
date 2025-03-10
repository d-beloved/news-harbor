import { MoonIcon, SunIcon } from "../../../assets/Icons";
import { useTheme } from "../../../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "dark"}
        className="theme-controller"
        onChange={toggleTheme}
      />
      <SunIcon className="swap-on fill-current w-6 h-6" />
      <MoonIcon className="swap-off fill-current w-6 h-6" />
    </label>
  );
};
