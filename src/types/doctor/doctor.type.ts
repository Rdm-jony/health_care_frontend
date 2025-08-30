export interface ISpecialize {
    _id?: string,
    name: string
}


 type DayOfWeek ="Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"|"Sunday"


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