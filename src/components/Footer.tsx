import React, { MouseEvent } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  return (
    <section id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-6 text-blue-400">
            Contact Us
            <span className="inline-block animate-bounce">👋</span>
          </h2>

          <p className=" text-gray-300 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We'd love to hear from
            you!
          </p>

          <div className="mt-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-blue-600" />
                <a
                  href="mailto:typingscholar.mail@gmail.com"
                  className="text-gray-300 hover:text-blue-500 transition"
                  aria-label="Contact Typing Scholar by Email"
                >
                  typingscholar.mail@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Branding */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex flex-row gap-2">
              <div className="bg-white rounded-sm w-8">
                <img src="/typingscholarlogo.png" alt="english-typing-test" />
              </div>
              <span className="text-xl font-bold tracking-wide">
                Typing Scholar
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Learn touch typing with key-based exercises, practice on long
              passages, and take mock tests (35+ passages, including 10+ from
              past government exams). Have fun with typing games!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6 text-blue-400">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Home", "About Us", "FAQ"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    onClick={(e) =>
                      handleScroll(e, item.toLowerCase().replace(" ", "-"))
                    }
                    className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center md:justify-start gap-2"
                  >
                    <span className="block w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              to="/privacy-policy"
              className="ml-2 mt-4 group text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center md:justify-start gap-2"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <Contact />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="text-sm">
            © {new Date().getFullYear()} Typing Scholar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
