/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const specialistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🧩 Create Specialist
    createSpecialist: build.mutation<any, FormData>({
      query: (data) => ({
        url: "/specialist/create-specialist",
        method: "POST",
        body: data, // ✅ use 'body', not 'data'
      }),
      invalidatesTags: [TagTypes.superadmin, TagTypes.admin, TagTypes.provider],
    }),

    // 🧩 Get All Specialists
    getAllSpecialist: build.query<any, void>({
      query: () => ({
        url: "/specialist",
        method: "GET",
      }),
      providesTags: [
        TagTypes.user,
        TagTypes.superadmin,
        TagTypes.admin,
        TagTypes.provider,
      ],
    }),

    // 🆕 Get Appointments by Specialist ID
    getAppointmentsBySpecialistId: build.query<any, string>({
      query: (specialistId) => ({
        url: `/specialist/${specialistId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.provider],
    }),
  }),
});

export const {
  useCreateSpecialistMutation,
  useGetAllSpecialistQuery,
  useGetAppointmentsBySpecialistIdQuery,
} = specialistApi;
