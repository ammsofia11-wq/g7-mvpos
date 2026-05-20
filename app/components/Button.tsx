export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
}