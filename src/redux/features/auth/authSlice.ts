import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

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
let initialAuthState: {
  user: IUser | undefined;
} = {
  user: undefined,
};


// Check if the cookie exists
const cookieData = Cookies.get("user");

// If the cookie exists, parse its value and set it as the initial state
if (cookieData) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedData:{user:IUser}  = JSON.parse(cookieData);
    initialAuthState = {
      user: parsedData.user,
    };
  } catch (error) {
    console.error("Error parsing cookie data:", error);
  }
}

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
