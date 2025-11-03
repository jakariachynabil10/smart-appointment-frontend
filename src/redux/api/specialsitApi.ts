import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const specialistApi = baseApi.injectEndpoints({
    endpoints : (build) =>({
        createSpecialist : build.mutation({
            query : (data) =>({
                url : "/specialist/create-specialist",
                method : "POST",
                contentType : "multipart/form-data",
                data
            }),
            invalidatesTags : [TagTypes.superadmin, TagTypes.admin, TagTypes.provider]   
        }),
        getAllSpecialist : build.query({
            query : () => ({
                url : "/specialist",
                method : "GET"
            }),
            providesTags : [TagTypes.user,TagTypes.superadmin, TagTypes.admin, TagTypes.provider]
        })
    }),
})

export const {
    useCreateSpecialistMutation,
    useGetAllSpecialistQuery
} = specialistApi