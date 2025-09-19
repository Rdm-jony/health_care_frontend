import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useGetMeQuery } from "@/redux/features/auth/authApi"
import { Link } from "react-router"
import { Button } from "./ui/button"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useGetMeQuery(undefined)

  const data = {
    navMain: getSidebarItems(userInfo?.role)
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>

      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, idx: number) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild >
                      <Link to={item?.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Link to="/">
          <Button className="w-full">Home</Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
