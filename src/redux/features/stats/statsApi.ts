import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUserStats } from "@/types";

export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userStats: builder.query<IUserStats, void>({
            query: () => ({
                url: `/stats/user`,
                method: "GET",
            }),
            transformResponse: (res: IResponse<IUserStats>) => res.data
        }),

    })
})

export const { useUserStatsQuery } = statsApi