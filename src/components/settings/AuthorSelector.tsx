import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { toggleAuthor } from "../../slices/preferencesSlice";

export const AuthorSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const selectedAuthors = useAppSelector((state) => state.preferences.authors);
  const articles = useAppSelector((state) => state.articles.items);

  // Get unique authors from articles
  const availableAuthors = Array.from(
    new Set(
      articles
        .map((article) => article.author)
        .filter((author): author is string => !!author),
    ),
  ).sort();

  const filteredAuthors = availableAuthors.filter((author) =>
    author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="form-control">
      <h3 className="text-lg font-semibold mb-4">Follow Authors</h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search authors..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {filteredAuthors.map((author) => (
          <label
            key={author}
            className="label cursor-pointer justify-start gap-2"
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedAuthors.includes(author)}
              onChange={() => dispatch(toggleAuthor(author))}
            />
            <span className="label-text">{author}</span>
          </label>
        ))}
      </div>

      {filteredAuthors.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">
          {searchTerm ? "No authors found" : "No authors available"}
        </p>
      )}
    </div>
  );
};
