// src/components/Checkbox.tsx
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  readOnly?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  readOnly = false,
}) => {
  return (
    <div
      onClick={!readOnly ? () => onChange(!checked) : undefined}
      className="w-4 h-4 border border-dark-500 flex items-center justify-center cursor-pointer rounded-none"
    >
      <svg
        className={`w-4 h-4 text-dark-500 transition-transform duration-150 transform ${
          checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
};

interface CheckboxROProps {
  checked: boolean;
}

export const CheckboxRO: React.FC<CheckboxROProps> = ({ checked }) => {
  return (
    <div className="w-4 h-4 border border-dark-500 flex items-center justify-center rounded-none">
      <svg
        className={`w-4 h-4 text-dark-500 transition-transform duration-150 transform ${
          checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
};
