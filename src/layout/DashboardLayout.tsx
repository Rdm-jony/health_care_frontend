import { AppSidebar } from "@/components/app-sidebar"
import DynamicBreadcrumb from "@/components/DynamicBreadcamp"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { authApi, useGetMeQuery, useLogoutMutation } from "@/redux/features/auth/authApi"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"

export default function DashboardLayout() {
    const { data } = useGetMeQuery(undefined)
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logout(null);
        dispatch(authApi.util.resetApiState());
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <DynamicBreadcrumb />
                    <div className="grow flex justify-end">
                        {
                            data && data.email ? <div className="flex gap-2 items-center">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={data?.picture} alt={data?.name} />
                                    <AvatarFallback>{data?.name[0]}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" onClick={handleLogout}>Logout</Button>
                            </div> : <Button className="">Sign In</Button>

                        }
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
