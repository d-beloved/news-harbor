import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { SearchBar } from "../../components/common/SearchBar";
import { TestWrapper } from "../Setup";
import { useArticlesContext } from "../../context/ArticlesContext";

// Mock the ArticlesContext module
vi.mock("../../context/ArticlesContext", () => ({
  useArticlesContext: vi.fn(() => ({
    loading: false,
    setSearchRequest: vi.fn(),
    searchRequest: "",
  })),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input with correct placeholder and search icon when not loading", () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText(/search for news articles/i);
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  it("displays loading spinner when loading and a search term is present", async () => {
    // Update mock with loading state
    vi.mocked(useArticlesContext).mockReturnValue({
      loading: true,
      setSearchRequest: vi.fn(),
      searchRequest: "test",
      items: [],
      error: null,
      hasMore: false,
      loadMore: vi.fn(),
    });

    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText(/search for news articles/i);
    fireEvent.change(input, { target: { value: "test" } });

    const spinner = await screen.findByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it("handles form submission and calls setSearchRequest", () => {
    const mockSetSearchRequest = vi.fn();

    // Update mock with the mock function
    vi.mocked(useArticlesContext).mockReturnValue({
      loading: false,
      setSearchRequest: mockSetSearchRequest,
      searchRequest: "",
      items: [],
      error: null,
      hasMore: false,
      loadMore: vi.fn(),
    });

    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText(/search for news articles/i);
    fireEvent.change(input, { target: { value: "breaking news" } });
    expect(input).toHaveValue("breaking news");

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(mockSetSearchRequest).toHaveBeenCalledWith("breaking news");
  });
});
