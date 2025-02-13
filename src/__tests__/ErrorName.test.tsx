import { render, screen } from "@testing-library/react";
import { RepoList } from "../components/RepoList";

jest.mock("../hooks/useGitHubRepos", () => ({
  useGitHubRepos: () => ({
    data: { error: "Пользователь не найден" },
    isLoading: false,
  }),
}));

test("Показывает сообщение об ошибке при неверном имени пользователя", () => {
  render(<RepoList username="nonexistentuser" />);

  expect(screen.getByText(/Пользователь не найден/i)).toBeInTheDocument();
});
