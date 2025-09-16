export interface IUserStats {
  totalUsers: number
  totalBlockedUsers: number
  newUsersInLast7Days: number
  newUsersInLast30Days: number
  totalPending: number
  usersByRole: IUsersByRole[]
}

export interface IUsersByRole {
  _id: string
  count: number
}
