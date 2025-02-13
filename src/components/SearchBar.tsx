import React, { useEffect, useState } from "react";

type Props = { onSearch: (username: string) => void };

export const SearchBar = ({ onSearch }: Props) => {
  const [username, setUsername] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    onSearch(e.target.value);
  };

  // to wait unitl user stops typing - for less calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (username.trim().length > 2) {
        onSearch(username);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={handleChange}
        className="w-full p-3 pl-10 text-gray-700 bg-white border rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.414-1.414l-3.85-3.85zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </div>
  );
};
