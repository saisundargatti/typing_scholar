import { BookOpen, FileText, Repeat, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const router = useLocation();
  const isLearnTypingRoute = router.pathname === "/learn-typing";
  return (
    <nav
      className={`${
        isLearnTypingRoute
          ? "fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50"
          : "w-full bg-gray-900 text-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div>
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white rounded-sm w-8">
              <img src="/anyrgb.com.png" alt="english-typing-test" />
            </div>
            <span className="text-xl font-bold tracking-wide">
              Typing Scholar
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            to="/typing-test"
            className="text-sm font-medium hover:text-gray-400 transition"
          >
            <FileText size={20} className="inline-block mr-1" />
            Typing Test
          </Link>
          <Link
            to="/learn-typing"
            className="text-sm font-medium hover:text-gray-400 transition"
          >
            <BookOpen size={20} className="inline-block mr-1" />
            Learn Typing
          </Link>
          <Link
            to="/typing-practice"
            className="text-sm font-medium hover:text-gray-400 transition"
          >
            <Repeat size={20} className="inline-block mr-1" />
            Typing Practice
          </Link>
          <Link
            to="/typing-games"
            className="text-sm font-medium hover:text-gray-400 transition"
          >
            <Trophy size={20} className="inline-block mr-1" />
            Typing Games
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
