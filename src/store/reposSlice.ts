import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReposState {
  username: string;
}

const initialState: ReposState = {
  username: "",
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = reposSlice.actions;
export default reposSlice.reducer;
