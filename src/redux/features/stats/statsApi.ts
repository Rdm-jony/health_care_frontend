import { baseApi } from "@/redux/baseApi";
import type { IDoctorStats, IResponse, ISpecializeStats, IUserStats } from "@/types";

export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userStats: builder.query<IUserStats, void>({
            query: () => ({
                url: `/stats/user`,
                method: "GET",
            }),
            transformResponse: (res: IResponse<IUserStats>) => res.data
        }),
        specializeStats: builder.query<ISpecializeStats, void>({
            query: () => ({
                url: `/stats/specialize`,
                method: "GET",
            }),
            transformResponse: (res: IResponse<ISpecializeStats>) => res.data
        }),
        doctorStats: builder.query<IDoctorStats, void>({
            query: () => ({
                url: `/stats/doctor`,
                method: "GET",
            }),
            transformResponse: (res: IResponse<IDoctorStats>) => res.data
        }),

    })
})

export const { useUserStatsQuery, useSpecializeStatsQuery ,useDoctorStatsQuery} = statsApi