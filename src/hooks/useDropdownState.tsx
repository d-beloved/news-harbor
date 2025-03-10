import { useState, useRef, useEffect } from "react";

interface UseDropdownStateProps {
  onClose?: () => void;
}

export const useDropdownState = ({ onClose }: UseDropdownStateProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (!prev && onClose) {
        onClose();
      }
      return !prev;
    });
  };

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
    handleToggle,
  };
};
