import React from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback = "/placeholder.jpg",
  ...props
}) => {
  return (
    <img
      src={src || fallback}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = fallback;
      }}
      {...props}
    />
  );
};
