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

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
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
    }

]);