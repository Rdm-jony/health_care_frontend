import { baseApi } from "@/redux/baseApi";
import type { IDoctor, IDoctorList, IResponse, ISpecialize } from "@/types";

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({




        getAllSpecialization: builder.query<ISpecialize[], void>({
            query: () => ({
                url: "/doctor/specialize/all",
                method: "GET"
            }),
            transformResponse: (res: IResponse<ISpecialize[]>) => res.data
        }),
        permitDoctor: builder.mutation<IResponse<null>, IDoctor>({
            query: (doctorInfo) => ({
                url: "/doctor/request-approve",
                method: "POST",
                data: doctorInfo
            }),
        }),
        rejectRequest: builder.mutation<IResponse<null>, string>({
            query: (userId) => ({
                url: `/doctor/request-reject/${userId}`,
                method: "PATCH",
            }),
        }),
        updateDoctorProfile: builder.mutation<IResponse<null>, { data: FormData, id: string }>({
            query: (userInfo) => ({
                url: `/doctor/${userInfo.id}`,
                method: "PATCH",
                data: userInfo.data
            }),
            invalidatesTags: ["ME"]
        }),
        allDoctors: builder.query<IResponse<IDoctorList[]>, object>({
            query: (params) => ({
                url: `/doctor/all`,
                method: "GET",
                params:params
            }),
        }),
    })
})

export const { useGetAllSpecializationQuery, usePermitDoctorMutation, useRejectRequestMutation, useUpdateDoctorProfileMutation,useAllDoctorsQuery } = doctorApi