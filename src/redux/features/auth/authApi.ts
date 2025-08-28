import { baseApi } from "@/redux/baseApi";
import type { ILogin, IRegister, IResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<IResponse<null>, IRegister>({
            query: (userInfo) => ({
                url: "/user/create",
                method: "POST",
                data: userInfo
            })
        }),
        login: builder.mutation<IResponse<null>,ILogin>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),

    })
})

export const { useRegisterMutation, useLoginMutation } = authApi