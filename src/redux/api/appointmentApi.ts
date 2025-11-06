/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ Create Appointment (User only)
    createAppointment: build.mutation<any,void>({
      query: (data) => ({
        url: "/appoinment/create-appointment",
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.user],
    }),

    // ✅ Get Appointments for a specific user
    getUserAppointment: build.query<any,void>({
      query: (userId) => ({
        url: `/appoinment/${userId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.user],
    }),

    // ✅ Update appointment status (Admin/Specialist only)
    updateAppointmentStatus: build.mutation<any,void>({
      query: ({ id, status } : any) => ({
        url: `/appoinment/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [TagTypes.user],
    }),

    // ✅ Get all appointments (Admin & Superadmin only)
    getAllAppointment: build.query<any, void>({
      query: () => ({
        url: "/appoinment",
        method: "GET",
      }),
      providesTags: [TagTypes.admin, TagTypes.superadmin],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateAppointmentMutation,
  useGetUserAppointmentQuery,
  useUpdateAppointmentStatusMutation,
  useGetAllAppointmentQuery,
} = appointmentApi;
