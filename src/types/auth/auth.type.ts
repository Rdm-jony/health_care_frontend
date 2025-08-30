export interface IRegister {
    name: string,
    email: string,
    password: string
}
export interface ILogin { email: string, password: string }

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "DOCTOR"


export type TGender = "MALE" | "FEMALE" | "OTHER"


export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}

export type DoctorRequest = "NONE" | "PENDING" | "PENDING" | "APPROVED"


export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password?: string,
    phone: string,
    gender: TGender,
    address: string,
    picture?: string,
    isDeleted?: boolean,
    isVerified?: boolean,
    permitToDoctor: DoctorRequest,
    role: TRole,
    auth: IAuthProvider[]

}

export interface IResestPassword { id: string, newPassword: string, token: string }