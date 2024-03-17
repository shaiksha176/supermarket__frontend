import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  toastMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
  },
});

export const { addToastMessage } = userSlice.actions;
export default userSlice.reducer;
