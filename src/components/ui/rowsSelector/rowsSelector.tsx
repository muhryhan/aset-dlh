import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const RowsSelector: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <label htmlFor="rows" className="text-theme-sm text-gray-700 dark:text-white">
      Tampilkan
    </label>
    <input
      id="rows"
      type="number"
      min={1}
      value={value}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val > 0) onChange(val);
      }}
      className="w-20 border border-gray-300 rounded px-2 py-1 text-theme-sm dark:bg-gray-800 dark:text-white"
    />
    <span className="text-theme-sm text-gray-700 dark:text-white">baris</span>
  </div>
);

export default RowsSelector;
