import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    useLogin: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        data: loginData, // ✅ use 'data' for Axios
      }),
      invalidatesTags: [TagTypes.admin, TagTypes.user, TagTypes.provider],
    }),
  }),
});

export const { useUseLoginMutation } = authApi;
