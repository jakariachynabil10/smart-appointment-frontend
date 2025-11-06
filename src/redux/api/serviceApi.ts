/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create service (POST)
    createService: build.mutation<any,void>({
      query: (data) => ({
        url: "/service/create-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TagTypes.superadmin, TagTypes.admin], // optional, if you use tags
    }),

    // Get all services (GET)
    getAllServices: build.query<any,void>({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      providesTags: [TagTypes.user], // optional
    }),
  }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery } = serviceApi;
