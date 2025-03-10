import { LazyImage } from "../common/LazyImage";

interface ArticleImageProps {
  imageUrl?: string;
  title: string;
  source: string;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  imageUrl,
  title,
  source,
}) => (
  <figure className="relative overflow-hidden h-48">
    <LazyImage
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute top-0 right-0 m-2">
      <span className="badge badge-primary">{source}</span>
    </div>
  </figure>
);
