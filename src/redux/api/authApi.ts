
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    useLogin: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        data: loginData, // ✅ use 'data' for Axios
      }),
    }),
  }),
});

export const { useUseLoginMutation } = authApi;
