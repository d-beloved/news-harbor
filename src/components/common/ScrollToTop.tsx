import { ChevronUpIcon } from "../../assets/Icons";
import { useScrollVisibility } from "../../hooks/useScrollVisibility";

interface ScrollToTopProps {
  className?: string;
  threshold?: number;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  className = "",
  threshold = 300,
}) => {
  const isVisible = useScrollVisibility({ threshold });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 btn btn-circle btn-primary shadow-lg hover:scale-110 transition-all duration-300 z-50 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="h-6 w-6" />
    </button>
  );
};
