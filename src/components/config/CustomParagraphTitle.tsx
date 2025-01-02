interface CustomParagraphTitleProps {
  value: string;
  onChange: (title: string) => void;
}

export const CustomParagraphTitle: React.FC<CustomParagraphTitleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Title
      </label>
      <input
        id="title"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter a title for your content"
      />
    </div>
  );
};
