import { useState, useEffect, useCallback } from "react";

interface ScrollVisibilityOptions {
  threshold?: number;
}

export const useScrollVisibility = ({
  threshold = 300,
}: ScrollVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  return isVisible;
};
