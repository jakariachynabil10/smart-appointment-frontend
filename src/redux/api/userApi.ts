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
    deleteUserById : build.mutation({
      query : (id : string) => ({
        url : `/user/${id}`,
        method : "DELETE"
      }),
      invalidatesTags : [TagTypes.admin, TagTypes.superadmin]
    })
  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery, useDeleteUserByIdMutation } = userApi;
