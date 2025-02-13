import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Repo = {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};

type FetchReposResponse = {
  repos: Repo[];
  hasMorePages: boolean;
};

const fetchRepos = async (
  username: string,
  page: number
): Promise<FetchReposResponse> => {
  if (!username) return { repos: [], hasMorePages: false };

  try {
    console.log(`Fetching repos for: ${username}, page: ${page}`);
    const { data, headers } = await axios.get<Repo[]>(
      `https://api.github.com/users/${username}/repos?per_page=20&page=${page}`,
      {
        headers: {
          // "User-Agent": "GitHubRepoSearchApp",
          Authorization: `Bearer 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`,
        },
      }
    );

    const hasMorePages =
      headers.link?.includes('rel="next"') || data.length === 20;

    return { repos: data, hasMorePages };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return { repos: [], hasMorePages: false };
  }
};

export const useGitHubRepos = (username: string, page: number) => {
  return useQuery({
    queryKey: ["repos", username, page],
    queryFn: () => fetchRepos(username, page),
    staleTime: 5000,
    enabled: !!username && page > 0,
  });
};
