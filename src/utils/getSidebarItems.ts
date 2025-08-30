
import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.ADMIN:
            return [...adminSidebarItems];
        case role.SUPER_ADMIN:
            return [...adminSidebarItems];

        default:
            return [];
    }
};