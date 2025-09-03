
export interface IBooking {
    _id?: string,
    doctor: {
        user: {
            name: string,
            picture: string,
        },
        specialization: string
        fees: number
    } | string,
    status?: string
    startTime: string;
    endTime: string;
    bookingDate?: Date;
    user?: {
        name:string,
        email:string,
        picture:string
    }| string,
    createdAt?: Date,
}