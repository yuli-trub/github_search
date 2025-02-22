import React from "react";
import { SearchBar } from "./components/SearchBar";
import githubIcon from "./assets/github_logo.svg";
import { RepoList } from "./components/RepoList";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const username = useSelector((state: RootState) => state.repos.username);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-8">
        {/* GitHub Logo */}
        <img
          src={githubIcon}
          alt="GitHub Logo"
          className="w-16 h-16 mb-4 opacity-80"
        />

        <h1 className="text-2xl font-bold mb-8">GitHub Repo Search</h1>
        <SearchBar />
      </div>
      <div className="container mx-auto">
        {username !== "" && <RepoList username={username} />}
      </div>

      <ScrollToTop />
    </div>
  );
};

export default App;
