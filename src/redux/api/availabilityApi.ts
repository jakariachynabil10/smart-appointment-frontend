import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const availabityApi = baseApi.injectEndpoints({
    endpoints : (build) =>({
        createAvailability : build.mutation({
           query : (data) => ({
            url : "/availability/create-availability",
            method : "POST",
            data
           }),
           invalidatesTags : [TagTypes.superadmin, TagTypes.admin, TagTypes.provider]    
        }),
        getAvailabilityBySpecialist : build.query({
            query : (specialistId) => ({
                url : `/availability/${specialistId}`,
                method : "GET"
            }),
            providesTags : [TagTypes.user,TagTypes.superadmin, TagTypes.admin, TagTypes.provider]
        })
    })
})


export const {useCreateAvailabilityMutation, useGetAvailabilityBySpecialistQuery} = availabityApi