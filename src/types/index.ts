/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react"

export type { IRegister, ILogin, IResestPassword, TRole, IUser } from "@/types/auth/auth.type"
export type { ISpecialize, IDoctor, IDoctorList, ISlot } from "@/types/doctor/doctor.type"
export type { IBooking } from "@/types/booking/booking.type"
export type { IUserStats, IDoctorStats, ISpecializeStats } from "@/types/stats/stats.type"
export type { IChat } from "@/types/chat/chat.type"

export interface IResponse<T> {
    success: boolean,
    message: string,
    statusCode: number,
    data: T,
    meta?: {
        limit:number,
        page:number,
        total:number,
        totalPage:number
    }
}

export interface ISidebarItem {
    title: string,
    items: {
        title: string,
        url: string,
        component: ComponentType
    }[]
}