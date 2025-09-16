export interface IUserStats {
  totalUsers: number
  totalBlockedUsers: number
  newUsersInLast7Days: number
  newUsersInLast30Days: number
  totalPending: number
  usersByRole: IUsersByRole[]
}
export interface ISpecializeStats {
  totalSpecialize: number
  totalSpecializeByDoctor:[]
}
export interface IDoctorStats {
  totalDoctors: number
  totalBlockedDoctors:number,
  newDoctorsInLast7Days:number,
  newDoctorsInLast30Days:number
}

export interface IUsersByRole {
  _id: string
  count: number
}
