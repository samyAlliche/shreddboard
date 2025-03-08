import React, { useState, useRef } from "react";
import { bgColorPicker, stickyColors, StickyNoteColor } from "../utils/color";

interface ColorPickerButtonProps {
  onColorChange: (color: StickyNoteColor) => void;
  currentColor: string;
}

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  onColorChange,
  currentColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleColorClick = (color: StickyNoteColor) => {
    onColorChange(color);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`w-6 h-6 ${bgColorPicker(
          currentColor
        )} rounded-full ring-2 ring-dark-500 focus:outline-none flex items-center justify-center hover:scale-105 transition-transform`}
      >
        {/* Optionally include an icon or text here */}
      </button>
      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 flex space-x-2 p-2 bg-white shadow-lg rounded-full">
          {stickyColors.map((color) => (
            <div
              key={color}
              className={`${bgColorPicker(
                color
              )} w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 transition transform duration-150 hover:scale-110`}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPickerButton;
