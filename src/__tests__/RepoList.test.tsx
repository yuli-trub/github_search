import { render, screen } from "@testing-library/react";
import { RepoList } from "../components/RepoList";

const mockData = {
  repos: [
    {
      id: 1,
      name: "test-repo",
      description: "Описание тестового репозитория",
      html_url: "https://github.com/test/test-repo",
      stargazers_count: 42,
      updated_at: "2023-01-01T00:00:00Z",
    },
  ],
};

jest.mock("../hooks/useGitHubRepos", () => ({
  useGitHubRepos: () => ({
    data: mockData,
    isLoading: false,
  }),
}));

test("Отображает список репозиториев", () => {
  render(<RepoList username="testuser" />);

  expect(screen.getByText("test-repo")).toBeInTheDocument();
  expect(
    screen.getByText("Описание тестового репозитория")
  ).toBeInTheDocument();
});
