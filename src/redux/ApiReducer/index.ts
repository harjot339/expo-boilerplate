import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const ApiReducer = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: builder => ({}),
});

export default ApiReducer;

export const {} = ApiReducer;
