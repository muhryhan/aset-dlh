import React from "react";

interface Props {
  onClick: () => void;
}

const AddButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-theme-sm"
  >
    + Tambah
  </button>
);

export default AddButton;
