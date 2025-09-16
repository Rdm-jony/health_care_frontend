import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Link, useLocation } from "react-router"

// Optional: friendly labels for routes
const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  recent: "Recent Users",
  settings: "Settings",
}

export default function DynamicBreadcrumb() {
  const location = useLocation() // current route
  const pathSegments = location.pathname.split("/").filter(Boolean) // ["dashboard", "users"]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1
          const href = "/" + pathSegments.slice(0, index + 1).join("/")
          const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
