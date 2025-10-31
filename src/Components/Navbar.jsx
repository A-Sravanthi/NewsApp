import { useState } from "react";

export default function Navbar({ onSearch, toggleTheme, darkMode }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <nav className={darkMode ? "bg-gray-800" : "bg-white shadow"}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">📰 News Feed</h1>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Search news..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600">
            Search
          </button>
        </form>
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
