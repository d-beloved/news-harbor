import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestWrapper } from "../Setup";
import { initialState } from "../../store/slices/articlesSlice";
import { DateFilter } from "../../components/filters/DateFilter";

describe("DateFilter", () => {
  it('renders default sort label as "Newest First" when sortOrder is "desc"', () => {
    // Set initial state with dateSort set to "desc"
    render(
      <TestWrapper
        initialState={{
          articles: { ...initialState, activeFilters: { dateSort: "desc" } },
        }}
      >
        <DateFilter />
      </TestWrapper>,
    );

    // Check for default label text.
    expect(screen.getAllByText(/newest first/i)[0]).toBeInTheDocument();

    // Open dropdown menu.
    fireEvent.click(screen.getByTestId("date-filter-trigger"));

    expect(screen.getByText(/sort by date/i)).toBeInTheDocument();
    expect(screen.getAllByText(/newest first/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/oldest first/i)[0]).toBeInTheDocument();
  });

  it("changes sort order when an option is clicked", () => {
    // Initially set to "desc"
    render(
      <TestWrapper
        initialState={{
          articles: { ...initialState, activeFilters: { dateSort: "desc" } },
        }}
      >
        <DateFilter />
      </TestWrapper>,
    );

    // Open dropdown menu.
    fireEvent.click(screen.getByTestId("date-filter-trigger"));

    // Click on "Oldest First"
    fireEvent.click(screen.getByText(/oldest first/i));

    // Expect the label to update (depending on your implementation, it might update to "Oldest First")
    expect(screen.getAllByText(/oldest first/i)[0]).toBeInTheDocument();
  });
});
