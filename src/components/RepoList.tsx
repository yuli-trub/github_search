import { useState, useEffect } from "react";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { RepoCard } from "./RepoCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

type Props = { username: string };

export const RepoList = ({ username }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGitHubRepos(username, page);

  const [allRepos, setAllRepos] = useState<any[]>([]);

  useEffect(() => {
    setPage(1);
    setAllRepos([]);
  }, [username]);

  useEffect(() => {
    if (data) {
      setAllRepos((prev) => [...prev, ...data.repos]);
    }
  }, [data]);

  const fetchMore = () => {
    if (isLoading || !data?.hasMorePages) return;
    setPage((prev) => prev + 1);
  };

  const observerRef = useInfiniteScroll(fetchMore);

  // поймать ошибки и лимиты запросов
  if (data?.error) {
    return <p className="text-center text-red-500 mt-4">{data.error}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {allRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            description={repo.description}
            url={repo.html_url}
            stars={repo.stargazers_count}
            updatedAt={repo.updated_at}
          />
        ))}

        <div ref={observerRef} className="h-10 bg-transparent"></div>
      </div>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
    </>
  );
};
