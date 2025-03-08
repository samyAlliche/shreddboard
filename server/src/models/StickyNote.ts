// src/models/StickyNote.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ITodo {
  text: string;
  isCompleted?: boolean;
}

export interface IStickyNote extends Document {
  title?: string;
  todos: ITodo[];
  size: "small" | "medium" | "large";
  color: "yellow" | "orange" | "blue" | "green" | "pink";
  expirationDate: Date;
  createdAt: Date;
}

const TodoSchema: Schema = new Schema({
  text: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const StickyNoteSchema: Schema = new Schema({
  title: { type: String, required: false, default: null },
  todos: [TodoSchema],
  size: { type: String, enum: ["small", "medium", "large"], default: "small" },
  color: {
    type: String,
    enum: ["yellow", "orange", "blue", "green", "pink"],
    default: "yellow",
  },
  expirationDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStickyNote>("StickyNote", StickyNoteSchema);
