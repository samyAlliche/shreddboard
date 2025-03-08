// src/routes/notes.ts
import { Router, Request, Response } from "express";
import StickyNote, { IStickyNote } from "../models/StickyNote";

const router = Router();

// GET all sticky notes
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const notes: IStickyNote[] = await StickyNote.find();
    res.json(notes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new sticky note
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newNote = new StickyNote(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH add a new todo to a sticky note by id
router.patch(
  "/:id/todos",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { todo } = req.body;
      if (!todo || !todo.text) {
        res
          .status(400)
          .json({ error: "Todo object with a text property is required" });
        return;
      }

      const updatedNote = await StickyNote.findByIdAndUpdate(
        req.params.id,
        { $push: { todos: todo } },
        { new: true }
      );

      if (!updatedNote) {
        res.status(404).json({ error: "Sticky note not found" });
        return;
      }

      res.json(updatedNote);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

// PUT update a sticky note by id
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedNote = await StickyNote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNote);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE remove a sticky note by id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await StickyNote.findByIdAndDelete(req.params.id);
    res.json({ message: "Sticky note deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
