import React from "react";
import { SearchBar } from "../common/SearchBar";
import { SettingsDropdown } from "../settings/SettingsDropdown";

export const Header: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <span className="btn btn-ghost text-xl">NewsHarbor</span>
      </div>
      <div className="navbar-center">
        <SearchBar />
      </div>
      <div className="navbar-end">
        <SettingsDropdown />
      </div>
    </div>
  );
};
