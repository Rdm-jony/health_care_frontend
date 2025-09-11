import { baseApi } from "@/redux/baseApi";
import type { IDoctor, IDoctorList, IResponse, ISlot, ISpecialize } from "@/types";

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSpecialization: builder.query<ISpecialize[], void>({
            query: () => ({
                url: "/doctor/specialize/all",
                method: "GET"
            }),
            providesTags: ["specialize"],
            transformResponse: (res: IResponse<ISpecialize[]>) => res.data
        }),
        updateSpecialization: builder.mutation<IResponse<null>, { id: string, formdata: FormData }>({
            query: (specializationInfo) => ({
                url: `/doctor/specialize/${specializationInfo.id}`,
                method: "PATCH",
                data: specializationInfo.formdata
            }),
            invalidatesTags: ["specialize"]
        }),
        addSpecialization: builder.mutation<IResponse<null>, FormData>({
            query: (specializationInfo) => ({
                url: `/doctor/specialize/create`,
                method: "POST",
                data: specializationInfo
            }),
            invalidatesTags: ["specialize"]
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
                params: params
            }),
        }),
        getSingleDoctor: builder.query<IDoctorList, string | undefined>({
            query: (doctorId) => ({
                url: `/doctor/${doctorId}`,
                method: "GET",
            }),
            transformResponse: (res: IResponse<IDoctorList>) => res.data
        }),
        getDoctorBookingSlot: builder.query<ISlot[], { id: string, date: string }>({
            query: (data) => ({
                url: `/doctor/slots/${data.id}?date=${data.date}`,
                method: "GET",
            }),
            transformResponse: (res: IResponse<ISlot[]>) => res.data

        }),
        sendDoctorRequest: builder.mutation<IResponse<null>, undefined>({
            query: () => ({
                url: `/user/request-send`,
                method: "POST",
            }),
            invalidatesTags: ["ME"]
        }),


    })
})

export const { useGetAllSpecializationQuery, usePermitDoctorMutation, useRejectRequestMutation, useUpdateDoctorProfileMutation, useAllDoctorsQuery, useGetSingleDoctorQuery, useGetDoctorBookingSlotQuery, useSendDoctorRequestMutation, useUpdateSpecializationMutation, useAddSpecializationMutation } = doctorApi