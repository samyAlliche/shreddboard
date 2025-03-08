import React from "react";
import { getDaysDifference } from "../utils/date";
import { CheckboxRO } from "./Checkbox";
import { bgColorPicker } from "../utils/color";
import { IStickyNote } from "./StickyNote";

interface StickyNoteROProps {
  note: IStickyNote;
  isThumbnail?: boolean;
}

const StickyNoteRO: React.FC<StickyNoteROProps> = ({
  note,
  isThumbnail = false,
}) => {
  const isExpired = new Date(note.expirationDate) < new Date();

  return (
    <div
      className={`p-4 ${bgColorPicker(note.color)} ${
        isThumbnail ? "w-35 h-35 sm:w-40 sm:h-40" : "w-full aspect-square"
      } dark:text-gray-950 flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-2">
        <h3
          className={`${
            isThumbnail ? "text-xl" : "text-3xl"
          } font-extrabold text-3xl bg-transparent border-gray-500 focus:outline-none w-full pb-2`}
        >
          {note.title || "Untitled"}
        </h3>
        {!isThumbnail && (
          <ul>
            {note.todos.map((todo, index) => (
              <li key={index} className="text-sm flex items-center space-x-2">
                <CheckboxRO checked={todo.isCompleted || false} />
                <span
                  className={`w-full ${
                    todo.isCompleted ? "line-through decoration-2" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs">
          {isExpired
            ? "Expired"
            : `${getDaysDifference(
                new Date(note.expirationDate),
                new Date()
              )} days left`}
        </p>
      </div>
    </div>
  );
};

export default StickyNoteRO;
