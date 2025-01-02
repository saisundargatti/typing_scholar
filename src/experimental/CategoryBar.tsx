import {
  Home,
  ArrowUp,
  Edit,
  ArrowDown,
  RefreshCcw,
  Hash,
  Type,
} from "lucide-react";

const categories = [
  { name: "Home", icon: <Home size={24} /> },
  { name: "Top", icon: <ArrowUp size={24} /> },
  { name: "Revise 1", icon: <Edit size={24} /> },
  { name: "Bottom", icon: <ArrowDown size={24} /> },
  { name: "Revise 2", icon: <RefreshCcw size={24} /> },
  { name: "Numbers", icon: <Type size={24} /> },
  { name: "Symbols", icon: <Hash size={24} /> },
];

const CategoryBar = () => {
  return (
    <div className="mt-6 max-w-4xl mx-auto flex justify-center items-center bg-gray-900 p-3 rounded-xl hover:shadow-xl transition-all duration-300">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center mx-5 cursor-pointer text-white hover:text-blue-400 transition-transform transform hover:scale-110 duration-200"
        >
          <div className="text-3xl mb-2">{category.icon}</div>
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
