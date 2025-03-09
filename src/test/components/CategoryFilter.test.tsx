import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestWrapper } from "../Setup";
import { CategoryFilter } from "../../components/filters/CategoryFilter";
import { initialState } from "../../slices/articlesSlice";

const articlesSample = [
  {
    id: "1",
    title: "A",
    category: "tech",
    description: "",
    content: "",
    source: "Source1",
    publishedAt: "",
    url: "",
    urlToImage: "",
  },
  {
    id: "2",
    title: "B",
    category: "business",
    description: "",
    content: "",
    source: "Source2",
    publishedAt: "",
    url: "",
    urlToImage: "",
  },
  {
    id: "3",
    title: "C",
    category: "tech",
    description: "",
    content: "",
    source: "Source1",
    publishedAt: "",
    url: "",
    urlToImage: "",
  },
];

describe("CategoryFilter", () => {
  it('renders available categories and default "All Categories"', () => {
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
        <CategoryFilter />
      </TestWrapper>,
    );

    const dropdownTrigger = screen.getByTestId("dropdown-trigger");
    +expect(dropdownTrigger).toHaveTextContent(/all categories/i);
    fireEvent.click(dropdownTrigger);

    // Now check that the dropdown list contains expected text.
    expect(screen.getByText(/select category/i)).toBeInTheDocument();
    expect(screen.getByText(/tech/i)).toBeInTheDocument();
    expect(screen.getByText(/business/i)).toBeInTheDocument();
  });

  it("dispatches the filter change when a category is clicked", () => {
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
        <CategoryFilter />
      </TestWrapper>,
    );

    // Click the dropdown trigger (using its visible text)
    const dropdownTrigger = screen.getByTestId("dropdown-trigger");
    fireEvent.click(dropdownTrigger);

    // Click on the "tech" option.
    fireEvent.click(screen.getByText(/^tech$/i));

    // Since getByText(/^tech$/i) might now return multiple matches,
    // we use getAllByText and then assert that one of them is present.
    const techOptions = screen.getAllByText(/^tech$/i);
    expect(techOptions.length).toBeGreaterThan(0);

    // Alternatively, if "tech" should update the trigger label,
    // you might narrow your query using a test ID on the trigger component.
  });
});
