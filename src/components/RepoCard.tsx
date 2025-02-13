import React from "react";

type RepoProps = {
  name: string;
  description?: string;
  url: string;
  stars: number;
  updatedAt: string;
};

export const RepoCard = ({
  name,
  description,
  url,
  stars,
  updatedAt,
}: RepoProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col justify-between">
      <h3 className="text-lg font-bold mb-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {name}
        </a>
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {description || "No description available"}
      </p>
      <div className="flex justify-between text-gray-500 text-sm">
        <span>⭐ {stars}</span>
        <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
