import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import { Article } from "../types/store.types";

interface UseFilterOptions<T> {
  items: Article[];
  filterKey: keyof Article;
  formatOption?: (value: string) => { id: string; name: string };
  activeFilterSelector: (state: any) => T;
  dispatchAction: (value: string) => any;
}

export const useFilter = <T>({
  items,
  filterKey,
  formatOption,
  activeFilterSelector,
  dispatchAction,
}: UseFilterOptions<T>) => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(activeFilterSelector);

  const options = useMemo(() => {
    const values = new Set(
      items.map((item) => item[filterKey]).filter(Boolean),
    );

    return Array.from(values)
      .filter((value): value is string => value !== undefined)
      .sort()
      .map((value) =>
        formatOption
          ? formatOption(value)
          : {
              id: value.toLowerCase().replace(/\s+/g, "-"),
              name: value,
            },
      );
  }, [items, filterKey, formatOption]);

  const handleChange = (value: string) => dispatch(dispatchAction(value));

  return {
    activeFilter,
    options,
    handleChange,
  };
};
