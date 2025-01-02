import { BookOpen, FileText, Repeat, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import Accordion from "./Faq";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Typing Test",
      description:
        "Offers an interactive test interface suitable for typing exams",
      path: "/typing-test",
      gradient: "from-blue-50 to-blue-100",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      title: "Learn Typing",
      description: "Start your journey with step-by-step typing lessons",
      path: "/learn-typing",
      gradient: "from-emerald-50 to-emerald-100",
    },
    {
      icon: <Repeat className="h-8 w-8 text-purple-600" />,
      title: "Typing Practice",
      description: "Build speed and accuracy with touch typing guidance",
      path: "/typing-practice",
      gradient: "from-purple-50 to-purple-100",
    },
    {
      icon: <Trophy className="h-8 w-8 text-amber-600" />,
      title: "Typing Games",
      description: "Have fun while improving your typing skills",
      path: "/typing-games",
      gradient: "from-amber-50 to-amber-100",
    },
  ];

  const TypewriterHeader = () => {
    const [text, setText] = useState("");
    const fullText = "Weelcome to Typing Scholar";

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <header
        className="text-center space-y-4"
        aria-label="Hero Section"
        id="home"
      >
        <h1 className="text-4xl font-extrabold text-gray-800">
          {text}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
          Learn, Practice, and Take Mock Typing Tests
        </p>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="px-4 py-16 space-y-16 max-w-7xl mx-auto">
        {/* Hero Section */}
        <TypewriterHeader />

        {/* Features Section */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          aria-label="Features Section"
        >
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`group bg-gradient-to-br ${feature.gradient} p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-102 w-full text-left`}
              aria-label={feature.title}
            >
              <div className="flex items-start space-x-6">
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <Aboutus />
        <Accordion />
      </main>
    </div>
  );
};

export const Aboutus: React.FC = () => {
  return (
    <section
      className="bg-white rounded-xl shadow-md p-8"
      aria-label="About Us Section"
      id="about-us"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">About Us</h2>
      <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
        <p>
          Welcome to Typing Scholar, your go-to platform for developing
          professional typing skills. Whether you're preparing for government
          exams, enhancing your career prospects, or simply want to type faster
          and more accurately, we're here to help you succeed.
        </p>
        <p>Our platform offers:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Mock typing test interface suitable for government exams (SSC CGL,
            CHSL, Railways and more)
          </li>
          <li>Structured typing courses for beginners to advanced users</li>
          <li>Interactive practice sessions with real-time feedback</li>
          <li>Engaging typing games to make learning enjoyable</li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
