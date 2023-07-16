import { IAddUser, IUser } from "./../../../types/globalTypes";
import { api } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import Cookies from 'js-cookie';

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // registerAdmin
    registerUser: builder.mutation<
      { statusCode: number; success: boolean; message: string; data: IUser },
      IAddUser
    >({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "user",
            JSON.stringify({
              user: result.data.data,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              user: result.data.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // login
    loginUser: builder.mutation<
      { statusCode: number; success: boolean; message: string; data: IUser },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "user",
            JSON.stringify({
              user: result.data.data,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              user: result.data.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
