import { baseApi } from "@/redux/baseApi";
import type { ILogin, IRegister, IResestPassword, IResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<IResponse<null>, IRegister>({
            query: (userInfo) => ({
                url: "/user/create",
                method: "POST",
                data: userInfo
            })
        }),
        login: builder.mutation<IResponse<null>, ILogin>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
        sendOtp: builder.mutation<IResponse<null>, { email: string }>({
            query: (email) => ({
                url: "/otp/send",
                method: "POST",
                data: email
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, { otp: string, email: string }>({
            query: (otpInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: otpInfo
            })
        }),
        forgetPassword: builder.mutation<IResponse<null>, { email: string }>({
            query: (email) => ({
                url: "/auth/forget-password",
                method: "POST",
                data: email
            })
        }),
        resetPassword: builder.mutation<IResponse<null>, IResestPassword>({
            query: (resetInfo) => ({
                url: "/auth/reset-password",
                method: "POST",

                headers: { "authorization": resetInfo.token },
                data: resetInfo
            })
        }),

    })
})

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation,useForgetPasswordMutation,useResetPasswordMutation } = authApi