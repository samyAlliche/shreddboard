import React, { useState, useEffect } from "react";
import { getDaysDifference } from "../utils/date";
import { Checkbox } from "./Checkbox";
import ShreddButton from "./ShreddButton";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { bgColorPicker, StickyNoteColor } from "../utils/color";
import ColorPickerButton from "./ColorPickerButton";
import DatePickerButton from "./DatePickerButton";

export interface ITodo {
  text: string;
  isCompleted?: boolean;
}

export interface IStickyNote {
  _id: string;
  title: string;
  todos: ITodo[];
  size: "small" | "medium" | "large";
  color: StickyNoteColor;
  expirationDate: Date;
  createdAt: Date;
}

interface StickyNoteProps {
  note: IStickyNote;
  onDelete: (id: string) => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({ note, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [todos, setTodos] = useState<ITodo[]>(note.todos);
  const [color, setColor] = useState(note.color);
  const [expirationDate, setExpirationDate] = useState(note.expirationDate);
  const [isModalOpen, setModalOpen] = useState(false);

  // Update the note color when a new color is chosen
  const handleColorChange = (newColor: StickyNoteColor) => {
    setColor(newColor);
  };

  const handleDelete = () => {
    onDelete(note._id);
    setModalOpen(false);
  };

  const isExpired = new Date(expirationDate) < new Date();

  // Debounced API update on changes to title, todos, color, or expirationDate
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://localhost:3000/api/notes/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          todos,
          color,
          expirationDate,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update note");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Note updated successfully", data);
        })
        .catch((error) => {
          console.error("Error updating note:", error);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, todos, color, expirationDate, note._id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTodoChange = (index: number, newText: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], text: newText };
    setTodos(updatedTodos);
  };

  const handleTodoCheckboxChange = (index: number, newChecked: boolean) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], isCompleted: newChecked };
    setTodos(updatedTodos);
  };

  // Function to add a new todo at the end
  const handleAddTodo = () => {
    setTodos([...todos, { text: "", isCompleted: false }]);
  };

  // Handler to delete a todo when Backspace is pressed on an empty input
  // and to add a new todo when Enter is pressed
  const handleTodoKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && todos[index].text === "") {
      e.preventDefault();
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedTodos = [...todos];
      updatedTodos.splice(index + 1, 0, { text: "", isCompleted: false });
      setTodos(updatedTodos);
    }
  };

  return (
    <div
      className={`p-4 ${bgColorPicker(
        color
      )} dark:text-gray-950 w-full aspect-square flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="font-extrabold text-3xl bg-transparent border-gray-500 focus:outline-none w-full pb-2"
          placeholder="Title"
        />

        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="text-sm flex items-center space-x-2">
              <Checkbox
                checked={todo.isCompleted || false}
                onChange={(newChecked: boolean) =>
                  handleTodoCheckboxChange(index, newChecked)
                }
              />
              <input
                type="text"
                value={todo.text}
                autoFocus={index === todos.length - 1}
                onChange={(e) => handleTodoChange(index, e.target.value)}
                onKeyDown={(e) => handleTodoKeyDown(e, index)}
                className={`bg-transparent border-gray-500 focus:outline-none w-full ${
                  todo.isCompleted ? "line-through decoration-2" : ""
                }`}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddTodo}
          className="px-0.5 text-black opacity-50 hover:opacity-100 duration-150 ease-in-out text-left"
        >
          +
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <DatePickerButton
            onDatePick={(newDate: Date) => setExpirationDate(newDate)}
            currentDate={new Date(note.expirationDate)}
          />
          <p className="text-xs">
            {isExpired
              ? "Expired"
              : `${getDaysDifference(
                  new Date(expirationDate),
                  new Date()
                )} days left`}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <ColorPickerButton
            onColorChange={handleColorChange} // Using our handleColorChange function
            currentColor={color}
          />
          <ShreddButton onClick={() => setModalOpen(true)} />
        </div>
      </div>
      {isModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StickyNote;
