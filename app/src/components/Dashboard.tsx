import React, { useEffect, useState } from "react";
import StickyNote, { IStickyNote } from "./StickyNote";
import AddStickyButton from "./AddStickyButton";
import ShreddStickyNoteAnimation from "./ShreddStickyNoteAnimation";
import StickyNoteRO from "./StickyNoteRO";
import ExpiredNotesModal from "./ExpiredNotesModal";

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<IStickyNote[]>([]);
  const [deletingNoteIds, setDeletingNoteIds] = useState<string[]>([]);
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState<boolean>(false);
  const [expiredNotes, setExpiredNotes] = useState<IStickyNote[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notes");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: IStickyNote[] = await response.json();
        setNotes(data);

        const expired = data.filter(
          (note) => new Date(note.expirationDate) < new Date()
        );

        if (expired.length > 0) {
          setExpiredNotes(expired);
          setIsExpiredModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Handler to create a new sticky note
  const handleAddNote = async () => {
    try {
      const newNoteData = {
        title: "",
        todos: [],
        size: "small", // default size
        expirationDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // expires in 7 days
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNoteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new sticky note");
      }

      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Error creating new note:", error);
    }
  };

  // When delete is clicked manually, add the note's id to deletingNoteIds
  const initiateDeleteNote = (id: string) => {
    setDeletingNoteIds((prev) => [...prev, id]);
  };

  // Finalize deletion: call the API and remove the note from state
  const finalizeDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the sticky note");
      }
      // Remove the note from the list
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Handle "OK" click in the modal → Shred and delete all expired notes
  const handleExpiredNotesDeletion = () => {
    setIsExpiredModalOpen(false); // Close modal
    setDeletingNoteIds(expiredNotes.map((note) => note._id)); // Start shredding animation
  };

  // Only show notes that are not currently being deleted
  const visibleNotes = notes.filter(
    (note) => !deletingNoteIds.includes(note._id)
  );

  return (
    <>
      {isExpiredModalOpen && (
        <ExpiredNotesModal
          expiredNotes={expiredNotes}
          onClose={handleExpiredNotesDeletion}
        />
      )}

      <div className="grid grid-cols-1 gap-2 w-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-max">
        {visibleNotes.map((note) => (
          <StickyNote
            key={note._id}
            note={note}
            onDelete={() => initiateDeleteNote(note._id)}
          />
        ))}
        <AddStickyButton onClick={handleAddNote} />
      </div>

      {deletingNoteIds.map((id) => {
        const note = notes.find((n) => n._id === id);
        if (!note) return null;
        return (
          <ShreddStickyNoteAnimation
            key={id}
            onAnimationEnd={() => {
              finalizeDeleteNote(id);
              setDeletingNoteIds((prev) =>
                prev.filter((noteId) => noteId !== id)
              );
            }}
          >
            <StickyNoteRO note={note} />
          </ShreddStickyNoteAnimation>
        );
      })}
    </>
  );
};

export default Dashboard;
