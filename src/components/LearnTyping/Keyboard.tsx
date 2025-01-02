import { rows } from "../../data/keys";
import FingerGuide from "./FingerGuide";

interface KeyProps {
  label: string;
  special?: string;
  className?: string;
}

export const Keyboard = () => {
  const Key = ({ label, special, className = "" }: KeyProps) => (
    <div
      className={`relative p-2 rounded-lg shadow-sm ${className} transition-all duration-150 hover:brightness-95 active:brightness-90 flex justify-center items-center`}
    >
      {special && (
        <span className="absolute text-xs text-gray-600 left-1 top-1">
          {special}
        </span>
      )}
      <span className="text-sm text-gray-800 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="p-8 space-y-2 rounded-xl shadow-lg max-w-3xl mx-10 h-72">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((key, keyIndex) => (
            <Key
              key={keyIndex}
              label={key.label}
              special={key.special}
              className={key.className}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const FingerTypingGuide = () => {
  const fingerInfo = [
    {
      side: "Left",
      fingers: [
        {
          color: "bg-pink-300",
          name: "Pinky",
          description:
            "Your tiny but mighty helper! Perfect for catching those A's and Q's",
        },
        {
          color: "bg-orange-200",
          name: "Ring",
          description: "The S-master! This finger loves to dance on the S key",
        },
        {
          color: "bg-yellow-200",
          name: "Middle",
          description:
            "Your D-lightful middle finger, ready for action in the center",
        },
        {
          color: "bg-green-200",
          name: "Index",
          description: "The F and G explorer, always finding its way home",
        },
      ],
    },
    {
      side: "Right",
      fingers: [
        {
          color: "bg-blue-200",
          name: "Index",
          description: "The J and H hunter, jumping with joy on the home row",
        },
        {
          color: "bg-purple-300",
          name: "Middle",
          description: "Your K-ing of the keyboard, keeping things moving",
        },
        {
          color: "bg-teal-200",
          name: "Ring",
          description: "The L-egendary finger, loving its home position",
        },
        {
          color: "bg-rose-200",
          name: "Pinky",
          description: "Your semicolon superstar; small but special!",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold"> Meet Your Typing Team! </h1>
        <p className="text-gray-600">
          Every finger has a special job in making you a typing superhero!
        </p>
      </div>
      <Keyboard />
      <div className="flex flex-col md:flex-row gap-6 justify-between mt-6">
        {fingerInfo.map((hand) => (
          <div key={hand.side} className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {hand.side} Hand Champions 🌟
            </h3>
            <div className="space-y-4">
              {hand.fingers.map((finger, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className={`w-6 h-6 rounded-full ${finger.color} flex-shrink-0`}
                  />
                  <div>
                    <h4 className="font-medium">{finger.name}</h4>
                    <p className="text-sm text-gray-600">
                      {finger.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-center font-semibold mb-2">
          👍 And don't forget your Thumbs! 👍
        </h3>
        <p className="text-center text-sm text-gray-600">
          Your space-making heroes! These chunky champions keep your words from
          running into each other.
        </p>
      </div>
      <FingerGuide />
    </div>
  );
};

export default FingerTypingGuide;
