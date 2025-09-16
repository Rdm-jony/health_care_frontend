import AddDoctorPage from "@/pages/admin/AddDoctorPage";
import AllDoctors from "@/pages/admin/AllDoctors";
import AllSpecialization from "@/pages/admin/AllSpecialization";
import AllUsers from "@/pages/admin/AllUsers";
import Overview from "@/pages/admin/Overview";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Services",
        items: [
            {
                title: "Overview",
                url: "/admin/overview",
                component: Overview
            },
            {
                title: "Permit Request",
                url: "/admin/add-doctor",
                component: AddDoctorPage
            },
            {
                title: "Specialization",
                url: "/admin/specialization",
                component: AllSpecialization
            },
            {
                title: "All User",
                url: "/admin/all-users",
                component: AllUsers
            },
            {
                title: "All Doctor",
                url: "/admin/all-doctor",
                component: AllDoctors
            },

        ]
    }
]