import React from "react";

interface LoadingProps {
  size?: number; // ukuran spinner
  text?: string; // teks tambahan
  center?: boolean; // apakah dipusatkan
}

const Loading: React.FC<LoadingProps> = ({
  size = 24,
  text = "Loading...",
  center = true,
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${
        center ? "justify-center py-4" : ""
      }`}
      role="status"
    >
      <svg
        className="animate-spin text-gray-600"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="text-gray-700 text-sm">{text}</span>
    </div>
  );
};

export default Loading;
