import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface ActionButtonsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButton: React.FC<ActionButtonsProps> = ({ onView, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={onView} className="text-blue-600 hover:text-blue-800" title="Lihat">
        <FaEye size={20} />
      </button>
      <button onClick={onEdit} className="text-yellow-500 hover:text-yellow-700" title="Edit">
        <FaEdit size={20} />
      </button>
      <button onClick={onDelete} className="text-red-600 hover:text-red-800" title="Hapus">
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default ActionButton;
