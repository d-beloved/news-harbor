import React from "react";
import { EmptyIcon } from "../../assets/Icons";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No articles found",
  icon,
}) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 text-center animate-fade-in"
    >
      <div className="w-24 h-24 mb-4 opacity-50">{icon || <EmptyIcon />}</div>
      <p className="text-lg font-medium text-base-content/70">{message}</p>
    </div>
  );
};
