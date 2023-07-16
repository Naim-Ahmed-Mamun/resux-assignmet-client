import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// user type
type IUser = {
  _id: string;
  name: string;
  email: string;
};
type IAuth = {
  user: IUser;
};

// Check if the cookie exists
const initialAuthState: {
  user: IUser | undefined;
} = {
  user: undefined,
};


const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    userLoggedIn: (state, { payload }: PayloadAction<IAuth>) => {
      state.user = payload.user;
    },
    userLoggedOut: (state) => {
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
