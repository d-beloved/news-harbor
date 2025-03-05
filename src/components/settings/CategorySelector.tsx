import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setCategories } from "../../slices/preferencesSlice";
import { CATEGORIES } from "../../constants";

export const CategorySelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.preferences.categories,
  );

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    dispatch(setCategories(newCategories));
  };

  return (
    <div className="form-control">
      <h3 className="text-lg font-semibold mb-4">
        Select Your Preferred Categories
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <label
            key={category}
            className="label cursor-pointer justify-start gap-4"
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
            />
            <span className="label-text">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
