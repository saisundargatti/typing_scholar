import {
  Keyboard,
  Monitor,
  LayoutGrid,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const TouchTypingGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Master Touch Typing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn to type efficiently without looking at the keyboard through
          proper technique and practice.
        </p>
      </div>

      {/* What is Touch Typing */}
      <div className="shadow-lg p-6 rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Keyboard className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-bold text-gray-900">
            What is Touch Typing?
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Touch typing is typing without looking at the keyboard. The
          fundamental idea is that each finger is given its own section of the
          keyboard, and your fingers learn the location of the keyboard through
          practicing regularly and gaining muscle memory to eventually build up
          speed whilst typing.
        </p>
      </div>

      {/* Getting Started Section */}
      <div className="shadow-lg p-6 rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Monitor className="w-6 h-6 text-green-500" />
          <h2 className="text-lg font-bold text-gray-900">
            Getting Started with Touch Typing
          </h2>
        </div>
        <div className="space-y-6">
          {/* Posture Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Proper Sitting Posture
            </h3>
            <ul className="space-y-2 list-none">
              {[
                "Sit straight with your back straight, feet firmly touching the ground",
                "Screen tilted upward, head slightly tilted forward",
                "Keep 45-70cm distance between eyes and screen",
                "Let wrists touch tabletop lightly, avoid resting body weight on them",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full text-center leading-6 flex-shrink-0">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Home Row Position */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Home Row Position
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed">
                The home row is central to touch typing success. It's your
                anchor point and reference position for reaching all other keys
                efficiently.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <img
                src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1735899496/800px-QWERTY-home-keys-position.svg_lnark9.png"
                alt="Keyboard finger position diagram"
                className="rounded-lg shadow-lg w-full max-w-2xl mx-auto"
              />
              <p className="text-gray-700 text-sm">
                Image by <span className="font-medium">Cy21</span>. Image link{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:QWERTY-home-keys-position.svg"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">
                Finding Home Row Position:
              </h4>
              <ol className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-semibold">1.</span>
                  Find the raised bumps on F and J keys
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-semibold">2.</span>
                  Left hand: A S D F, Right hand: J K L ;
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-semibold">3.</span>
                  Return to this position after reaching for other keys
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Layout */}
      <div className="shadow-lg p-6 rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-6 h-6 text-purple-500" />
          <h2 className="text-lg font-bold text-gray-900">Keyboard Layout</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Each finger has a designated area of the keyboard to cover. Your
          index, middle, and ring fingers move vertically from their home
          position, while your thumbs manage the space bar and your pinky
          fingers handle the outer keys.
        </p>
        <div className="space-y-4 text-center">
          <img
            src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1735899745/Keyboard_scheme_y95ckk.jpg"
            alt="Keyboard finger position diagram"
            className="rounded-lg shadow-lg w-full max-w-2xl mx-auto"
          />
          <p className="text-gray-700 text-sm">
            Image by <span className="font-medium">Artur Mihno</span>. Image
            link{" "}
            <a
              href="https://upload.wikimedia.org/wikipedia/commons/c/ce/Keyboard_scheme.jpg?20130828092010"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="shadow-lg p-6 rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-amber-500" />
          <h2 className="text-lg font-bold text-gray-900">
            Pro Tips for Success
          </h2>
        </div>
        <div className="grid gap-4">
          {[
            "Resist looking at keys - use F and J bumps to reorient",
            "Minimize hand movement - keep close to home position",
            "Develop a consistent typing rhythm",
            "Focus on training pinky and ring fingers",
            "Prioritize accuracy over speed initially",
          ].map((tip, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
            >
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Explore More Section */}
      <section
        className="shadow-lg p-6 rounded-lg bg-white mt-12"
        aria-labelledby="explore-more-title"
      >
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-6 h-6 text-indigo-500" aria-hidden="true" />
          <h2
            id="explore-more-title"
            className="text-lg font-bold text-gray-900"
          >
            Explore More and Improve Your Skills
          </h2>
        </div>
        <p className="text-gray-700 mb-6">
          Ready to enhance your typing skills? Check out these resources to
          learn, practice, and test your abilities!
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Links */}
          {[
            {
              label: "Learn Typing",
              href: "/learn-typing",
              description:
                "Guided step by step exercises to improve muscle memory",
            },
            {
              label: "Practice Typing",
              href: "/typing-practice",
              description:
                "Guided Practice on long paragraphs and improve skill and accuracy.",
            },
            {
              label: "Typing Games",
              href: "/typing-games",
              description: "Practice by playing games.",
            },
            {
              label: "Take a Test",
              href: "/typing-test",
              description: "Evaluate your typing speed and accuracy.",
            },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="flex flex-col items-start p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg shadow-sm transition duration-200 group"
            >
              <h3 className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-800">
                {link.label}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TouchTypingGuide;
