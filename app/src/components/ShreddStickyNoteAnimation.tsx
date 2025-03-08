import React, { useEffect, useState } from "react";

interface ShreddStickyNoteAnimationProps {
  onAnimationEnd?: () => void;
  children: React.ReactNode;
}

const ShreddStickyNoteAnimation: React.FC<ShreddStickyNoteAnimationProps> = ({
  onAnimationEnd,
  children,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the shredding animation as soon as this component mounts.
    setAnimate(true);

    // Using 3.5s based on your keyframe durations.
    const timer = setTimeout(() => {
      setAnimate(false);
      if (onAnimationEnd) onAnimationEnd();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  // Define which parts get which animation class.
  const partPIndices = [1, 2, 4, 6, 8, 10];
  const partQIndices = [3, 5, 7, 9];
  const parts = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="shredded-animation-container fixed inset-0 flex items-center justify-center bg-black/50 w-full h-full z-50">
      <div
        className={`shredded-paper ${animate ? "animate-shredded-paper" : ""}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 50%)",
        }}
      >
        {/* The "content" div shows your sticky note's original content */}
        <div
          className={`content flex items-center justify-center w-screen ${
            animate ? "animate-content" : ""
          }`}
        >
          {children}
        </div>
        {/* Each part represents a sliced section of your note */}
        {parts.map((part) => {
          let additionalClass = "";
          if (animate && partPIndices.includes(part)) {
            additionalClass = " shredded-paper-p-animate";
          } else if (animate && partQIndices.includes(part)) {
            additionalClass = " shredded-paper-q-animate";
          }
          return (
            <div key={part} className={`part-${part}${additionalClass}`}>
              {children}
            </div>
          );
        })}
      </div>
      <div className={`shredder-holder`}>
        <div className="shredder bg-stone-700 text-white text-sm font-extrabold flex p-4 rounded-t-2xl">
          <span className="flex">ShreddBoard Inc.</span>
        </div>
        <div className="glass-container"></div>
      </div>
    </div>
  );
};

export default ShreddStickyNoteAnimation;
