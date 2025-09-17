import { baseApi } from "@/redux/baseApi";
import type { IChat, IResponse } from "@/types";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        chat: builder.mutation<IResponse<IChat>, { message: string, threadId: string }>({
            query: (chatInfo) => ({
                url: `/chat/create`,
                method: "POST",
                data: chatInfo
            }),
        }),


    })
})

export const { useChatMutation } = chatApi