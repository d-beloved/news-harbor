import React from "react";
import { SearchBar } from "../common/SearchBar";
import { SettingsDropdown } from "../settings/SettingsDropdown";
import { useTheme } from "../../context/ThemeContext";
import { MoonIcon, SunIcon } from "../../assets/Icons";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="bg-base-100 shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-[1000] transition-all duration-50 flex flex-col md:flex-row max-md:pb-2">
      <div className="navbar">
        <div className="navbar-start">
          <span className="btn btn-ghost cursor-default text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NewsHarbor
          </span>
        </div>
        <div className="px-4 max-w-4xl w-full hidden md:flex">
          <SearchBar />
        </div>
        <div className="navbar-end lg:w-[400px] justify-end gap-2">
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
          <SettingsDropdown />
        </div>
      </div>
      <div className="px-2 max-w-4xl w-full md:hidden">
        <SearchBar />
      </div>
    </div>
  );
};
