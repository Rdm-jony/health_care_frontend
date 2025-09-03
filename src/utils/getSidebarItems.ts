
import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { doctorSidebarItems } from "@/routes/doctorSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.ADMIN:
            return [...adminSidebarItems];
        case role.SUPER_ADMIN:
            return [...adminSidebarItems];
        case role.DOCTOR:
            return [...doctorSidebarItems];

        default:
            return [];
    }
};