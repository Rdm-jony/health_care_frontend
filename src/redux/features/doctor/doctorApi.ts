import { baseApi } from "@/redux/baseApi";
import type { IDoctor, IResponse, ISpecialize } from "@/types";

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({




        getAllSpecialization: builder.query<ISpecialize[], void>({
            query: () => ({
                url: "/doctor/specialize/all",
                method: "GET"
            }),
            transformResponse: (res: IResponse<ISpecialize[]>) => res.data
        }),
        permitDoctor: builder.mutation<IResponse<null>, IDoctor>({
            query: (doctorInfo) => ({
                url: "/doctor/request-approve",
                method: "POST",
                data:doctorInfo
            }),
        }),
    })
})

export const { useGetAllSpecializationQuery,usePermitDoctorMutation } = doctorApi