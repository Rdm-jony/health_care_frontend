import { baseApi } from "@/redux/baseApi";
import type { ILogin, IRegister, IResestPassword, IResponse, IUser } from "@/types";

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
        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            transformResponse: (res) => res.data,
            providesTags: ["ME"]
        }),
        getAllPendingReq: builder.query<IUser[], void>({
            query: () => ({
                url: "/user/request/all",
                method: "GET"
            }),
            transformResponse: (res: IResponse<IUser[]>) => res.data
        }),
        updateUser: builder.mutation<IResponse<null>, { data: FormData, id: string }>({
            query: (userInfo) => ({
                url: `/user/${userInfo.id}`,
                method: "PATCH",
                data: userInfo.data
            }),
            invalidatesTags: ["ME"]
        }),
        logout: builder.mutation<IResponse<null>, null>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            })
        }),
        getAllUsers: builder.query<IResponse<null>, object>({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params: params
            })
        }),
        
    })
})

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation, useForgetPasswordMutation, useResetPasswordMutation, useGetMeQuery, useGetAllPendingReqQuery, useUpdateUserMutation, useLogoutMutation,useGetAllUsersQuery } = authApi