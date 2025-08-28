import App from "@/App";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
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
    }
]);