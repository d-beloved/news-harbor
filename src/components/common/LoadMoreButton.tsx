interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
  searchRequest?: string;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  loading,
  onClick,
  searchRequest,
}) => (
  <button
    onClick={onClick}
    className="btn btn-primary btn-wide hover:scale-105 transition-transform"
    disabled={loading}
  >
    {loading ? (
      <span className="loading loading-spinner loading-sm" />
    ) : searchRequest ? (
      "Search More Articles"
    ) : (
      "Discover More Articles"
    )}
  </button>
);
