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
    role: TRole,
    auth: IAuthProvider[]

}