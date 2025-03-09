import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestWrapper } from "../Setup";
import { SourceFilter } from "../../components/filters/SourceFilter";
import { initialState } from "../../slices/articlesSlice";

// Sample articles with sources.
const articlesSample = [
  {
    id: "1",
    title: "A",
    source: "TechCrunch",
    description: "",
    content: "",
    category: "tech",
    publishedAt: "",
    url: "",
    urlToImage: "",
  },
  {
    id: "2",
    title: "B",
    source: "Bloomberg",
    description: "",
    content: "",
    category: "business",
    publishedAt: "",
    url: "",
    urlToImage: "",
  },
  {
    id: "3",
    title: "C",
    source: "TechCrunch",
    description: "",
    content: "",
    category: "tech",
    publishedAt: "",
    url: "",
    urlToImage: "",
  },
];

describe("SourceFilter", () => {
  it('renders default "All Sources" and available sources', () => {
    render(
      <TestWrapper
        initialState={{
          articles: {
            ...initialState,
            items: articlesSample,
            activeFilters: {},
          },
        }}
      >
        <SourceFilter />
      </TestWrapper>,
    );

    // Default label should display "All Sources"
    expect(screen.getAllByText(/all sources/i)[0]).toBeInTheDocument();

    // Open dropdown
    fireEvent.click(screen.getByTestId("source-filter-trigger"));

    // Verify the available sources are rendered (TechCrunch and Bloomberg)
    expect(screen.getByText(/techcrunch/i)).toBeInTheDocument();
    expect(screen.getByText(/bloomberg/i)).toBeInTheDocument();
  });

  it("updates active source filter on click", () => {
    render(
      <TestWrapper
        initialState={{
          articles: {
            ...initialState,
            items: articlesSample,
            activeFilters: {},
          },
        }}
      >
        <SourceFilter />
      </TestWrapper>,
    );

    // Open dropdown
    fireEvent.click(screen.getByTestId("source-filter-trigger"));

    // Click on "TechCrunch"
    fireEvent.click(screen.getByText(/techcrunch/i));

    // Expect the label now shows "TechCrunch"
    expect(screen.getAllByText(/techcrunch/i)[0]).toBeInTheDocument();
  });
});
