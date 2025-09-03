import AddDoctorPage from "@/pages/admin/AddDoctorPage";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Services",
        items: [
            {
                title: "Permit Request",
                url: "/admin/add-doctor",
                component: AddDoctorPage
            },

        ]
    }
]