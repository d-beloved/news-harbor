import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { TestWrapper } from "../Setup";
import { initialState } from "../../slices/articlesSlice";
import { ArticleList } from "../../components/article/ArticleList";

const sampleArticles = [
  {
    id: "1",
    title: "First Article",
    source: "Test Source",
    publishedAt: "2023-03-01T12:00:00Z",
    url: "https://example.com/1",
    urlToImage: "https://example.com/img1.jpg",
    category: "tech",
  },
  {
    id: "2",
    title: "Second Article",
    source: "Test Source",
    publishedAt: "2023-03-02T12:00:00Z",
    url: "https://example.com/2",
    urlToImage: "https://example.com/img2.jpg",
    category: "tech",
  },
];

describe("ArticleList", () => {
  it("renders error state", () => {
    const errorMessage = "Failed to load articles";

    render(
      <TestWrapper initialState={{ articles: initialState }}>
        <ArticleList
          items={[]}
          loading={false}
          error="Failed to load articles"
          hasMore={false}
          loadMore={() => {}}
        />
      </TestWrapper>,
    );

    // The error alert should be present with the error text.
    const errorElement = screen.getByRole("alert");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMessage);
  });

  it("renders empty state when no articles exist", () => {
    render(
      <TestWrapper initialState={{ articles: initialState }}>
        <ArticleList
          items={[]}
          loading={false}
          error={null}
          hasMore={false}
          loadMore={() => {}}
        />
      </TestWrapper>,
    );

    // Renders empty state message.
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
  });

  it("renders list of articles and triggers loadMore", () => {
    const loadMore = vi.fn();

    render(
      <TestWrapper initialState={{ articles: initialState }}>
        <ArticleList
          items={sampleArticles}
          loading={false}
          error={null}
          hasMore={true}
          loadMore={loadMore}
        />
      </TestWrapper>,
    );

    // Both articles should be rendered.
    expect(screen.getByText("First Article")).toBeInTheDocument();
    expect(screen.getByText("Second Article")).toBeInTheDocument();

    // The "Discover More Articles" button should be present.
    const button = screen.getByRole("button", {
      name: /discover more articles/i,
    });
    expect(button).toBeInTheDocument();

    // When the button is clicked, the loadMore handler should be called.
    fireEvent.click(button);
    expect(loadMore).toHaveBeenCalled();
  });
});
