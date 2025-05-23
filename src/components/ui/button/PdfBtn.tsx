import React from "react";

interface Props {
  onClick: () => void;
}

const ExportPDFButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-red-600 text-white px-3 py-1 rounded text-theme-sm hover:bg-red-700"
  >
    PDF
  </button>
);

export default ExportPDFButton;
