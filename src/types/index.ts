export type {IRegister,ILogin,IResestPassword} from "@/types/auth/auth.type"

export interface IResponse<T> {
    success: boolean,
    message: string,
    statusCode: number,
    data: T[] | T,
}