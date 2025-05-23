// src/components/SearchInput.tsx
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Cari... "
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded px-3 py-1 text-theme-sm dark:bg-gray-800 dark:text-white"
  />
);

export default SearchInput;