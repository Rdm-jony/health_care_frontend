import App from "@/App";
import { role } from "@/constants/role";
import DashboardLayout from "@/layout/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPassPage from "@/pages/ResetPassPage";
import VerifyPage from "@/pages/VerifyPage";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import AllDoctor from "@/pages/AllDoctor";
import Profile from "@/pages/Profile";
import DoctorDetailsPage from "@/pages/doctor/DoctorDetailsPage";
import BookingPage from "@/pages/user/BookingPage";
import { doctorSidebarItems } from "./doctorSidebarItems";
import PaymentSuccess from "@/pages/payment/Success";
import PaymentCancel from "@/pages/payment/Cancel";
import PaymentFailed from "@/pages/payment/Falied";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "all-doctor",
                Component: AllDoctor,

            },
            {
                path: "profile",
                Component: withAuth(Profile)
            },
            {
                path: "details/:id",
                Component: DoctorDetailsPage
            },
            {
                path: "bookings",
                Component: BookingPage
            }


        ]
    },
    {
        path: "/login",
        Component: LoginPage
    },
    {
        path: "/register",
        Component: RegisterPage
    },
    {
        path: "/verify",
        Component: VerifyPage
    },
    {
        path: "/reset-password",
        Component: ResetPassPage
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.ADMIN as TRole),
        children: [...generateRoutes(adminSidebarItems)]
    },
    {
        path: "/doctor",
        Component: withAuth(DashboardLayout, role.DOCTOR as TRole),
        children: [...generateRoutes(doctorSidebarItems)]
    },
    {
        path: "/payment/success",
        Component: PaymentSuccess,
    },
    {
        path: "/payment/cancel",
        Component: PaymentCancel,
    },
    {
        path: "/payment/fail",
        Component: PaymentFailed,
    }

]);