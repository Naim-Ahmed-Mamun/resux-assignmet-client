import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://resux-assignmet-server.vercel.app/api/v1' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  tagTypes: ['books','book','recent-books'],
  endpoints: () => ({}),
});
