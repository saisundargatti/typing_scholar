import { useNavigate } from "react-router-dom";

const NavigateButton = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/learn-typing");
  };

  return (
    <div>
      <button
        onClick={handleNavigation}
        className="px-4 py-2 bg-green-600 text-sm text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Learn Typing
      </button>
    </div>
  );
};

export default NavigateButton;
