import App from "@/App";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPassPage from "@/pages/ResetPassPage";
import VerifyPage from "@/pages/VerifyPage";
import { createBrowserRouter } from "react-router";

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
]);