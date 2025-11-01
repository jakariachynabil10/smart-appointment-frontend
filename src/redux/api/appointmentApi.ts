import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const appoitnmentApi = baseApi.injectEndpoints({
  endpoints : (build) => ({
    createAppointment : build.mutation({
        query : (data) => ({
            url : "/appointment/create-appointment",
            method : "POST",
            data
        }),
        invalidatesTags : [TagTypes.user]
    }),
    getUserAppointment : build.query({
        query : (userId) => ({
            url : `/appointment/${userId}`,
            method : "GET"
        }),
        providesTags : [TagTypes.user]
    }),
    updateAppointmentStatus : build.mutation({
        query : ({id, status}) => ({
              url : `/appointment/${id}`,
              method : "PATCH",
              data : {status},
        }),
        invalidatesTags : [TagTypes.user]
    })
  })
})



export const {useCreateAppointmentMutation, useGetUserAppointmentQuery, useUpdateAppointmentStatusMutation} = appoitnmentApi