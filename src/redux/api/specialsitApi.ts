/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const specialistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🧩 Create Specialist (FormData)
    createSpecialist: build.mutation<any, FormData>({
      query: (data) => ({
        url: "/specialist/create-specialist",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [TagTypes.superadmin, TagTypes.admin],
    }),

    // 🧩 Get All Specialists
    getAllSpecialist: build.query<any, void>({
      query: () => ({
        url: "/specialist",
        method: "GET",
      }),
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
