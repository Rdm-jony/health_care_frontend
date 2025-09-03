import { baseApi } from "@/redux/baseApi";
import type {  IResponse } from "@/types";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initPayment: builder.mutation<IResponse<string>, string>({
            query: (bookingId) => ({
                url: `/payment/init/${bookingId}`,
                method: "POST",
            }),
        }),
    
     
        

    })
})

export const { useInitPaymentMutation} = paymentApi