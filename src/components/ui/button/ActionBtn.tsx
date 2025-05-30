import React from "react";
import { FaTools, FaDollyFlatbed, FaEdit, FaTrash } from "react-icons/fa";

interface ActionButtonProps {
  onClick: () => void;
}

export const ServiceButton: React.FC<ActionButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-600 hover:text-blue-800"
    title="Servis"
  >
    <FaTools size={19} />
  </button>
);

export const DistributionButton: React.FC<ActionButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-green-600 hover:text-blue-800"
    title="Servis"
  >
    <FaDollyFlatbed size={20} />
  </button>
);

export const EditButton: React.FC<ActionButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-yellow-500 hover:text-yellow-700"
    title="Edit"
  >
    <FaEdit size={20} />
  </button>
);

export const DeleteButton: React.FC<ActionButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-red-600 hover:text-red-800"
    title="Hapus"
  >
    <FaTrash size={20} />
  </button>
);

export const ActionButton: React.FC<{
  onService: () => void;
  onDistribution: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ onService, onDistribution, onEdit, onDelete }) => (
  <div className="flex space-x-2">
    <ServiceButton onClick={onService} />
    <DistributionButton onClick={onDistribution} />
    <EditButton onClick={onEdit} />
    <DeleteButton onClick={onDelete} />
  </div>
);

export default ActionButton;
