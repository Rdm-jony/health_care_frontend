import { baseApi } from "@/redux/baseApi";
import type { IBooking,IResponse } from "@/types";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
         createBooking: builder.mutation<IResponse<null>, IBooking>({
            query: (bookingInfo) => ({
                url: "/booking/create",
                method: "POST",
                data: bookingInfo
            }),
        }),
    
    })
})

export const {useCreateBookingMutation}=bookingApi