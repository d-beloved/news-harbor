import React from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "../../common/SearchBar";
import { SettingsDropdown } from "../../settings/SettingsDropdown";

const Header: React.FC = () => (
  <div className="bg-base-100 shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-[1000] transition-all duration-50 flex flex-col md:flex-row max-md:pb-2">
    <div className="navbar">
      <div className="navbar-start">
        <Logo text="NewsHarbor" />
      </div>

      <div className="px-4 max-w-4xl w-full hidden md:flex">
        <SearchBar />
      </div>

      <div className="navbar-end lg:w-[400px] justify-end gap-2">
        <ThemeToggle />
        <SettingsDropdown />
      </div>
    </div>

    <div className="px-2 max-w-4xl w-full md:hidden">
      <SearchBar />
    </div>
  </div>
);

export default Header;
