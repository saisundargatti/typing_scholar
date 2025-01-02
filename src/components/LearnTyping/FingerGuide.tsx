const FingerGuide: React.FC = () => {
  return (
    <div className="bg-pink-50 p-6 rounded-lg mt-4">
      <div className="mt-4 text-pink-700 font-medium">
        <h3 className="text-lg font-semibold">
          How to Follow the Virtual Finger Guide:
        </h3>
        <p className="mt-2">
          The virtual finger guide will show you which finger to use for each
          key on the keyboard. Here’s how to follow it:
        </p>
        <ol className="list-decimal pl-5 mt-2 text-gray-700">
          <li>
            When typing, you will see a highlighted finger on the screen. This
            is the finger you should use for the key you are typing.
          </li>

          <li>
            If you see a finger highlighted (for example, the{" "}
            <span className="font-semibold">right index</span>), try to use that
            finger for the corresponding key, like{" "}
            <span className="font-semibold">H, J, Y, U, N, or M</span>.
          </li>

          <li>
            Practice typing by following the finger guide. Don’t worry if you
            make mistakes—just keep typing the highlighted character.
          </li>
          <li>
            The key to improving is consistency—use the right finger for each
            key, and over time, you will get faster and more accurate.
          </li>
        </ol>
        <div className="mt-4 text-pink-700 font-medium">
          <span className="inline-block mr-2">&#x1F4A1;</span>
          Remember, the{" "}
          <span className="font-semibold">nearest little pinky</span> is used
          for the <span className="font-semibold">Shift</span> key, while the{" "}
          <span className="font-semibold">left pinky</span> is used for{" "}
          <span className="font-semibold">Caps Lock</span>. Follow the guide,
          keep practicing, and you'll improve your typing skills quickly!
        </div>
      </div>
    </div>
  );
};

export default FingerGuide;
