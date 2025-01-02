type SuccessMessageProps = {
  isCategoryComplete: () => boolean; // Function that returns a boolean
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  isCategoryComplete,
}) => {
  const message = () => {
    if (!isCategoryComplete()) {
      return (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Well done!</h2>
          <p className="text-gray-600 text-lg">
            Moving to the next exercise...
          </p>
        </div>
      );
    } else {
      return (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Congratulations!
          </h2>
          <p className="text-gray-600 text-lg">
            You've completed all exercises in this category.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Success Animation Container */}
      <div className="relative">
        {/* Ping Animation Circle */}
        <div className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-green-400 opacity-20"></div>

        {/* Checkmark Circle */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="relative h-20 w-20 text-green-500 animate-scale"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-75"
          />
          <path
            d="M8 12l3 3 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Success Message */}
      {message()}
    </div>
  );
};

export default SuccessMessage;
