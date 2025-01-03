interface Row {
  label: string;
  special?: string;
  className: string;
}

export const rows: Row[][] = [
  // Numbers row
  [
    { label: "`", special: "~", className: "bg-pink-300 w-10" },
    { label: "1", special: "!", className: "bg-pink-300 w-10" },
    { label: "2", special: "@", className: "bg-orange-200 w-10" },
    { label: "3", special: "#", className: "bg-yellow-200 w-10" },
    { label: "4", special: "$", className: "bg-green-200 w-10" },
    { label: "5", special: "%", className: "bg-green-200 w-10" },
    { label: "6", special: "^", className: "bg-blue-200 w-10" },
    { label: "7", special: "&", className: "bg-blue-200 w-10" },
    { label: "8", special: "*", className: "bg-purple-300 w-10" },
    { label: "9", special: "(", className: "bg-teal-200 w-10" },
    { label: "0", special: ")", className: "bg-rose-200 w-10" },
    { label: "-", special: "_", className: "bg-rose-200 w-10" },
    { label: "=", special: "+", className: "bg-rose-200 w-10" },
    { label: "Backspace", className: "bg-rose-200 w-24" },
  ],
  // QWERTY row
  [
    { label: "Tab", className: "bg-pink-300 w-16" },
    { label: "Q", className: "bg-pink-300 w-10" },
    { label: "W", className: "bg-orange-200 w-10" },
    { label: "E", className: "bg-yellow-200 w-10" },
    { label: "R", className: "bg-green-200 w-10" },
    { label: "T", className: "bg-green-200 w-10" },
    { label: "Y", className: "bg-blue-200 w-10" },
    { label: "U", className: "bg-blue-200 w-10" },
    { label: "I", className: "bg-purple-300 w-10" },
    { label: "O", className: "bg-teal-200 w-10" },
    { label: "P", className: "bg-rose-200 w-10" },
    { label: "[", special: "{", className: "bg-rose-200 w-10" },
    { label: "]", special: "}", className: "bg-rose-200 w-10" },
    { label: "\\", special: "|", className: "bg-rose-200 w-14" },
  ],
  // Home row
  [
    { label: "Capslock", className: "bg-pink-300 w-20" },
    { label: "A", className: "bg-pink-300 w-10" },
    { label: "S", className: "bg-orange-200 w-10" },
    { label: "D", className: "bg-yellow-200 w-10" },
    { label: "F", className: "bg-green-200 w-10" },
    { label: "G", className: "bg-green-200 w-10" },
    { label: "H", className: "bg-blue-200 w-10" },
    { label: "J", className: "bg-blue-200 w-10" },
    { label: "K", className: "bg-purple-300 w-10" },
    { label: "L", className: "bg-teal-200 w-10" },
    { label: ";", special: ":", className: "bg-rose-200 w-10" },
    { label: "'", special: '"', className: "bg-rose-200 w-10" },
    { label: "Enter", className: "bg-rose-200 w-24" },
  ],
  // ZXCV row
  [
    { label: "Shift", className: "bg-pink-300 w-24" },
    { label: "Z", className: "bg-pink-300 w-10" },
    { label: "X", className: "bg-orange-200 w-10" },
    { label: "C", className: "bg-yellow-200 w-10" },
    { label: "V", className: "bg-green-200 w-10" },
    { label: "B", className: "bg-green-200 w-10" },
    { label: "N", className: "bg-blue-200 w-10" },
    { label: "M", className: "bg-blue-200 w-10" },
    { label: ",", special: "<", className: "bg-purple-300 w-10" },
    { label: ".", special: ">", className: "bg-teal-200 w-10" },
    { label: "/", special: "?", className: "bg-rose-200 w-10" },
    { label: "Shift", className: "bg-rose-200 w-28" },
  ],
  // Bottom row
  [
    { label: "Ctrl", className: "bg-pink-300 w-11" },
    { label: "Fn", className: "bg-pink-300 w-11" },
    { label: "Win", className: "bg-pink-300 w-11" },
    { label: "Alt", className: "bg-orange-200 w-11" },
    { label: "Space", className: "bg-gray-200 w-[15rem]" },
    { label: "Alt", className: "bg-purple-300 w-11" },
    { label: "Ctrl", className: "bg-teal-200 w-11" },
  ],
];

export const fingerColors = {
  leftPinky: "bg-pink-300",
  leftRing: "bg-blue-200",
  leftMiddle: "bg-green-200",
  leftIndex: "bg-yellow-200",
  rightIndex: "bg-orange-200",
  rightMiddle: "bg-red-200",
  rightRing: "bg-purple-300",
  rightPinky: "bg-teal-200",
};
