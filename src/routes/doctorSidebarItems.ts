import PedingBooking from "@/pages/doctor/PedingBooking";
import type { ISidebarItem } from "@/types";

export const doctorSidebarItems: ISidebarItem[] = [
    {
        title: "Services",
        items: [
            {
                title: "Pending Booking",
                url: "/doctor/pending-booking",
                component: PedingBooking
            },

        ]
    }
]