import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "../store/reposSlice";

// пробник стор с редюсером
const mockStore = configureStore({
  reducer: {
    repos: reposReducer,
  },
});

describe("SearchBar Component", () => {
  test("Отображается поле ввода", () => {
    render(
      <Provider store={mockStore}>
        <SearchBar />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Поиск репозиториев по имени пользователя...")
    ).toBeInTheDocument();
  });

  test("Обновляет состояние Redux при вводе", () => {
    render(
      <Provider store={mockStore}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      "Поиск репозиториев по имени пользователя..."
    );

    fireEvent.change(input, { target: { value: "testuser" } });

    expect(input).toHaveValue("testuser");
  });
});
