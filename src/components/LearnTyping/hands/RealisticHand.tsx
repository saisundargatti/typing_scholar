import React, { useState, useEffect } from "react";
import "./styles.css";

// Comprehensive key-to-finger mapping
const keyToFingerMap = [
  {
    side: "left",
    finger: "pinky",
    keys: [
      "Q",
      "A",
      "Z",
      "1",
      "!",
      "`",
      "~",
      "Control",
      "Shift",
      "Tab",
      "Capslock",
    ],
  },
  {
    side: "left",
    finger: "ring",
    keys: ["W", "S", "X", "2", "@"],
  },
  {
    side: "left",
    finger: "middle",
    keys: ["E", "D", "C", "3", "#"],
  },
  {
    side: "left",
    finger: "index",
    keys: ["R", "T", "F", "G", "V", "B", "4", "5", "$", "%"],
  },
  {
    side: "right",
    finger: "index",
    keys: ["Y", "U", "H", "J", "N", "M", "6", "7", "^", "&"],
  },
  {
    side: "right",
    finger: "middle",
    keys: ["I", "K", ",", "8", "*", "<"],
  },
  {
    side: "right",
    finger: "ring",
    keys: ["O", "L", ".", "9", "(", ">"],
  },
  {
    side: "right",
    finger: "pinky",
    keys: [
      "P",
      ";",
      "/",
      "0",
      ")",
      "-",
      "_",
      "'",
      "+",
      "=",
      "Shift",
      "Enter",
      '"',
      "?",
      "[",
      "]",
      "{",
      "}",
      "\\",
      "|",
      ":",
    ],
  },

  {
    side: "left",
    finger: "thumb",
    keys: [" ", "Alt", "Meta"],
  },
  {
    side: "right",
    finger: "thumb",
    keys: [" ", "Alt", "Control", "Meta"],
  },
];

interface HandProps {
  side: "left" | "right";
  displayedKey: string;
}

const RealisticHand: React.FC<HandProps> = ({ side, displayedKey }) => {
  const [highlightedFinger, setHighlightedFinger] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Normalize the key
    const normalizedKey = normalizeKey(displayedKey);

    // Find the finger mapping for the specific side and key
    const fingerMapping = keyToFingerMap.find(
      (mapping) =>
        mapping.side === side &&
        mapping.keys.some((key) => normalizeKey(key) === normalizedKey)
    );

    // Set highlighted finger if found
    if (fingerMapping) {
      setHighlightedFinger(`${side} ${fingerMapping.finger}`);
    } else {
      setHighlightedFinger(null);
    }
  }, [displayedKey, side]);

  // Helper function to normalize keys
  const normalizeKey = (key: string): string => {
    const normalizations: { [key: string]: string } = {
      " ": "SPACE",
      Spacebar: "SPACE",
      Enter: "ENTER",
      Shift: "SHIFT",
      Control: "CTRL",
      Alt: "ALT",
      Meta: "COMMAND",
    };

    const uppercaseKey = key.toUpperCase();
    return normalizations[uppercaseKey] || normalizations[key] || uppercaseKey;
  };

  return (
    <div className={`hand-container ${side}-hand`}>
      <div className={`hand ${side}-hand`}>
        <div className="palm"></div>
        {["thumb", "index", "middle", "ring", "pinky"].map((finger) => (
          <div
            key={finger}
            className={`finger ${finger} ${
              highlightedFinger === `${side} ${finger}` ? "highlighted" : ""
            }`}
          >
            <div className="fingernail"></div>
          </div>
        ))}
        <div className="wrist"></div>
      </div>
    </div>
  );
};

export default RealisticHand;
