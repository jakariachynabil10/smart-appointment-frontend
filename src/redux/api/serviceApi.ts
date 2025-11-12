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
         data,
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
    getServiceBySpecialistId : build.query<any, string>({
      query : (specialistId) => ({
        url : `/service/${specialistId}`,
        method : "GET"
      }),
      providesTags : [TagTypes.provider, TagTypes.user]
    })
  }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery , useGetServiceBySpecialistIdQuery} = serviceApi;
