import React, { FC, useState } from "react";
import { ErrorImageIcon } from "../../assets/Icons";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const LazyImage: FC<LazyImageProps> = ({
  src,
  alt,
  className,
  fallback = "https://placehold.co/600x400/94a3b8/ffffff?text=News", // Default fallback image
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-base-200 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <ErrorImageIcon className="h-12 w-12 mx-auto opacity-50" />
          <p className="mt-2 text-sm text-base-content/50">
            Image not available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && (
        <div
          className={`absolute inset-0 animate-pulse bg-base-200 ${className}`}
        />
      )}
      <img
        src={src || fallback}
        alt={alt}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};
