
export interface ISpecialize {
    _id?: string,
    name: string,
    image?:string
}


type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"


export interface IAvailableSlot {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
    slotDuration: number;
}
export interface IDoctor {
    user: string,
    specialization: string,
    licenceNumber: string,
    availableTimes: IAvailableSlot[],
    degree: string,
    experience: number,
    fees: number,
    about: string
}

export interface IDoctorList {
    _id: string
    user: {
        name: string
        email: string
        phone?: string
        gender?: string
        address?: string
        picture?: string
    }
    about: string
    degree?: string
    experience?: number
    fees: number
    specialization: {
        name: string
    }
    availableTimes?: {
        day: string
        startTime: string
        endTime: string
        slotDuration: number
    }
}

export interface ISlot {
    startTime: string,
    endTime: string
}  