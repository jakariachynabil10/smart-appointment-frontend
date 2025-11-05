/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query<any, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [
        TagTypes.user,
        TagTypes.superadmin,
        TagTypes.admin,
        TagTypes.provider,
      ],
    }),
     getSingleUser: build.query<any,void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [TagTypes.user],
    }),
  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery } = userApi;
