import React from "react";
import StickyNoteRO from "./StickyNoteRO";
import { IStickyNote } from "./StickyNote";

interface ExpiredNotesModalProps {
  expiredNotes: IStickyNote[]; // Accepts an array of expired notes
  onClose: () => void; // Called when "OK" is clicked
}

const ExpiredNotesModal: React.FC<ExpiredNotesModalProps> = ({
  expiredNotes,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-xl flex flex-col gap-4">
        <h2 className="text-xl font-bold">Expired Sticky Notes</h2>
        <div className="max-h-60 overflow-auto grid grid-cols-2 w-full sm:grid-cols-3 gap-2">
          {expiredNotes.length > 0 ? (
            expiredNotes.map((note) => (
              <StickyNoteRO key={note._id} note={note} isThumbnail />
            ))
          ) : (
            <p className="text-gray-500 text-center">No expired notes</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Bye bye notes 🥲
        </button>
      </div>
    </div>
  );
};

export default ExpiredNotesModal;
