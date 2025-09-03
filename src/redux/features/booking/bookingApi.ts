import { baseApi } from "@/redux/baseApi";
import type { IBooking, IResponse } from "@/types";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation<IResponse<null>, IBooking>({
            query: (bookingInfo) => ({
                url: "/booking/create",
                method: "POST",
                data: bookingInfo
            }),
        }),
        getUserBooking: builder.query<IBooking[], void>({
            query: () => ({
                url: "/booking/user/me",
                method: "GET",
            }),
            transformResponse: (res: IResponse<IBooking[]>) => res.data
        }),
        getDoctorBooking: builder.query<IBooking[], object>({
            query: (params) => ({
                url: "/booking/doctor/me",
                method: "GET",
                params: params
            }),
            transformResponse: (res: IResponse<IBooking[]>) => res.data
        }),
        cashBooking: builder.mutation<IResponse<null>, string>({
            query: (bookigId) => ({
                url: `/booking/cash/${bookigId}`,
                method: "PATCH",
            }),
        }),
        

    })
})

export const { useCreateBookingMutation, useGetUserBookingQuery, useGetDoctorBookingQuery ,useCashBookingMutation} = bookingApi