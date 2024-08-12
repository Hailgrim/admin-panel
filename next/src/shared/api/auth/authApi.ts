import { createApi } from '@reduxjs/toolkit/query/react';

import authService from '@/shared/api/auth/authService';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { IUser } from '../users/types';
import { IResetPassword, IUserSignIn, IUserSignUp, IVerifyUser } from './types';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.query<IUser, IUserSignUp>({
      query: authService.signUpArgs,
    }),

    signIn: builder.query<IUser, IUserSignIn>({
      query: authService.signInArgs,
    }),

    verifyUser: builder.query<boolean, IVerifyUser>({
      query: authService.verifyUserArgs,
    }),

    forgotPassword: builder.query<boolean, string>({
      query: authService.forgotPasswordArgs,
    }),

    resetPassword: builder.query<boolean, IResetPassword>({
      query: authService.resetPasswordArgs,
    }),

    refresh: builder.query<boolean, void>({
      query: authService.refreshArgs,
    }),

    signOut: builder.mutation<boolean, void>({
      query: authService.signOutArgs,
    }),
  }),
});

export default authApi;
