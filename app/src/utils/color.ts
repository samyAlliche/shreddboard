export const bgColorPicker = (color: string) => {
  switch (color) {
    case "yellow":
      return "bg-stickyYellow-500";
    case "orange":
      return "bg-stickyOrange-500";
    case "blue":
      return "bg-stickyBlue-500";
    case "green":
      return "bg-stickyGreen-500";
    case "pink":
      return "bg-stickyPink-500";
    default:
      return "bg-stickyYellow-500";
  }
};

export enum StickyNoteColor {
  Yellow = "yellow",
  Orange = "orange",
  Blue = "blue",
  Green = "green",
  Pink = "pink",
}

export const stickyColors = [
  StickyNoteColor.Yellow,
  StickyNoteColor.Orange,
  StickyNoteColor.Blue,
  StickyNoteColor.Green,
  StickyNoteColor.Pink,
];
