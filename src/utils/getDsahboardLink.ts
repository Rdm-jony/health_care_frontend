import { role } from "@/constants/role"
import type { IUser } from "@/types/auth/auth.type"

// Dynamically add dashboard link depending on role
export const getDashboardLink = (data: IUser) => {
    if (!data?.email) return null

    if (data.role === role.USER) {
        return { url: "/user", label: "Dashboard" }
    }
    else if (data.role === role.ADMIN || data.role === role.SUPER_ADMIN) {
        return { url: "/admin", label: "Dashboard" }
    }
    return null
}