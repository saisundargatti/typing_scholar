import React, { useState } from "react";

interface FAQ {
  question: string;
  answer: string | JSX.Element;
}

const faqs: FAQ[] = [
  {
    question: "What is Typing Scholar?",
    answer:
      "Typing Scholar is an online platform designed to help users enhance their typing skills through features like typing tests, practice sessions, structured lessons, and engaging games.",
  },
  {
    question: "Is Typing Scholar free to use?",
    answer: "Yes, Typing Scholar offers free access to all features.",
  },
  {
    question: "What key features does Typing Scholar offer for a typing test?",
    answer: (
      <div>
        <p>
          Typing Scholar offers a customizable interface with the following key
          features:
        </p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>
            <strong>Duration:</strong> Set the test length in minutes.
          </li>
          <li>
            <strong>Custom Passages:</strong> Use predefined or custom text.
          </li>
          <li>
            <strong>Backspace Option:</strong> Enable/disable backspace for exam
            simulation.
          </li>
          <li>
            <strong>Test Results:</strong> View detailed metrics like WPM,
            accuracy, and errors.
          </li>
          <li>
            <strong>Font Size:</strong> Adjust passage font for comfort.
          </li>
          <li>
            <strong>Previous Passages:</strong> Practice with past exam passages
            (SSC, Railways, Police).
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "How can I improve my typing speed and accuracy?",
    answer:
      "Our Typing Practice section provides character-level validation with touch typing guidance. Users can select the duration and passages to enhance speed and accuracy.",
  },
  {
    question: "Are there lessons for beginners?",
    answer:
      "Yes, our Learn Typing section offers progressive lessons that help beginners build their typing skills from the basics.",
  },
  {
    question: "How is my typing performance measured?",
    answer: (
      <div>
        <p>Your performance is measured with detailed metrics, including:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>
            <strong>Net Speed:</strong> Your typing speed, accounting for
            corrections.
          </li>
          <li>
            <strong>Gross Speed:</strong> Total words typed, without considering
            mistakes.
          </li>
          <li>
            <strong>Accuracy:</strong> Percentage of correct words typed.
          </li>
          <li>
            <strong>Total Words Typed:</strong> The total number of words typed
            during the test.
          </li>
          <li>
            <strong>Total Correct Words:</strong> Words typed correctly,
            excluding mistakes.
          </li>
          <li>
            <strong>Total Mistakes:</strong> Number of errors made during the
            test.
          </li>
          <li>
            <strong>Total Omissions:</strong> Number of omitted words.
          </li>
          <li>
            <strong>Error Rate:</strong> Speed lost due to errors.
          </li>
          <li>
            <strong>Backspace Pressed:</strong> How many times the backspace key
            was used.
          </li>
          <li>
            <strong>Test Duration:</strong> Time taken to complete the test.
          </li>
        </ul>
        <p>
          Additionally, you will receive a detailed breakdown of mistakes, with
          an option to retry the test to improve your results.
        </p>
      </div>
    ),
  },
  {
    question: "In which language are the tests offered?",
    answer: "In English",
  },
];

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-3xl mx-auto p-4"
      aria-label="faq-section"
      id="faq"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <article key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-3 px-4 flex justify-between items-center text-lg font-medium text-gray-800 hover:bg-gray-100 focus:outline-none"
              aria-expanded={openIndex === index ? "true" : "false"}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="py-3 px-4 text-gray-600"
              >
                {faq.answer}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
