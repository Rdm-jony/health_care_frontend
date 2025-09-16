/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react"

export type { IRegister, ILogin, IResestPassword, TRole,IUser } from "@/types/auth/auth.type"
export type { ISpecialize ,IDoctor,IDoctorList,ISlot} from "@/types/doctor/doctor.type"
export type { IBooking} from "@/types/booking/booking.type"
export type { IUserStats} from "@/types/stats/stats.type"

export interface IResponse<T> {
    success: boolean,
    message: string,
    statusCode: number,
    data: T,
}

export interface ISidebarItem {
    title: string,
    items: {
        title: string,
        url: string,
        component: ComponentType
    }[]
}