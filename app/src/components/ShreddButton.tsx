import React from "react";
import ShredderIcon from "./icons/ShredderIcon";

interface ShreddButtonProps {
  onClick: () => void;
}

const ShreddButton: React.FC<ShreddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 duration-150 ease-in-out transform text-dark-500 hover:text-red-600 hover:scale-110"
    >
      <ShredderIcon />
    </button>
  );
};

export default ShreddButton;
