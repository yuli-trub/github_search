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
  error?: string;
};

const fetchRepos = async (
  username: string,
  page: number
): Promise<FetchReposResponse> => {
  if (!username) return { repos: [], hasMorePages: false };

  try {
    const { data, headers } = await axios.get<Repo[]>(
      `https://api.github.com/users/${username}/repos?per_page=20&page=${page}`,
      {
        headers: {
          // "User-Agent": "GitHubRepoSearchApp",
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
        },
      }
    );

    const hasMorePages =
      headers.link?.includes('rel="next"') || data.length === 20;

    return { repos: data, hasMorePages };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return {
        repos: [],
        hasMorePages: false,
        error: "Пользователь не найден. Проверьте имя.",
      };
    }
    if (error.response?.status === 403) {
      return {
        repos: [],
        hasMorePages: false,
        error: "Превышен лимит запросов GitHub API. Попробуйте позже.",
      };
    }
    return { repos: [], hasMorePages: false, error: "Ошибка загрузки данных." };
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
