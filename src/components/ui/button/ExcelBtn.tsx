import React from "react";

interface Props {
  onClick: () => void;
}

const ExportExcelButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-600 text-white px-3 py-1 rounded text-theme-sm hover:bg-green-700"
  >
    Excel
  </button>
);

export default ExportExcelButton;
