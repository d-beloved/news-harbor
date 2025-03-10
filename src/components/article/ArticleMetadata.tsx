import { format } from "timeago.js";
import { CalendarIcon, AuthorIcon } from "../../assets/Icons";

interface ArticleMetadataProps {
  publishedAt: string;
  author?: string;
}

export const ArticleMetadata: React.FC<ArticleMetadataProps> = ({
  publishedAt,
  author,
}) => (
  <div className="grid grid-cols-2 items-center gap-2 mb-2 text-sm opacity-70">
    <time className="flex items-center gap-1 min-w-0">
      <CalendarIcon className="h-4 w-4 flex-shrink-0" />
      {format(new Date(publishedAt))}
    </time>
    {author && (
      <div className="flex items-center gap-1 min-w-0">
        <AuthorIcon className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{author}</span>
      </div>
    )}
  </div>
);
