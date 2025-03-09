import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Article } from "../../types/store.types";
import { TestWrapper } from "../Setup";
import { ArticleCard } from "../../components/article/ArticleCard";

describe("ArticleCard", () => {
  const mockArticle = {
    title: "Test Article",
    url: "https://test.com",
    urlToImage: "https://test.com/image.jpg",
    publishedAt: "2024-03-08T12:00:00Z",
    source: "Test Source",
  } as Article;

  it("renders article card with correct content", () => {
    render(
      <TestWrapper>
        <ArticleCard article={mockArticle} />
      </TestWrapper>,
    );

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByAltText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.source)).toBeInTheDocument();
  });

  it("links to the correct article URL", () => {
    render(
      <TestWrapper>
        <ArticleCard article={mockArticle} />
      </TestWrapper>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", mockArticle.url);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
