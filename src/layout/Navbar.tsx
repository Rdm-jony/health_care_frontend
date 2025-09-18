import Logo from "@/assets/images/Logo"
import { ModeToggle } from "@/components/mode-toggle"
import ProfileMenu from "@/components/ProfileMenu"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useGetMeQuery } from "@/redux/features/auth/authApi"
import { getDashboardLink } from "@/utils/getDashboardLink"
import { useMemo } from "react"
import { Link, useLocation } from "react-router" // ✅ useLocation for active effect

// Base navigation links
const baseLinks = [
    { url: "/", label: "Home" },
    { url: "/all-doctor", label: "All Doctors" },
    { url: "/about", label: "About" },
    { url: "/contact", label: "Contact" },
]

export default function Navbar() {
    const { data } = useGetMeQuery(undefined)
    const location = useLocation()

    // merge dashboard link if user logged in
    const navigationLinks = useMemo(() => {
        const dashboardLink = getDashboardLink(data)
        return [...baseLinks, ...(dashboardLink ? [dashboardLink] : [])]
    }, [data])
    return (
        <header className="border-b px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks?.map((link, index) => {
                                        const isActive = location.pathname === link.url
                                        return (
                                            <NavigationMenuItem key={index} className="w-full">
                                                <NavigationMenuLink
                                                    asChild
                                                    className={`py-1.5 w-full block rounded-md transition-colors ${isActive
                                                        ? "text-primary font-semibold bg-primary/10"
                                                        : "text-muted-foreground hover:text-primary"
                                                        }`}
                                                >
                                                    <Link to={link?.url ?? "/"}>{link?.label}</Link>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>

                    {/* Desktop main nav */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-primary hover:text-primary/90">
                            <Logo />
                        </Link>

                        <NavigationMenu className="max-md:hidden">
                            <NavigationMenuList className="gap-2">
                                {navigationLinks.map((link, index) => {
                                    const isActive = location.pathname === link.url
                                    return (
                                        <NavigationMenuItem key={index}>
                                            <NavigationMenuLink
                                                asChild
                                                className={`py-1.5 font-medium rounded-md transition-colors ${isActive
                                                    ? "text-primary font-semibold border-b-2 border-primary"
                                                    : "text-muted-foreground hover:text-primary"
                                                    }`}
                                            >
                                                <Link to={link?.url ?? "/"}>{link?.label}</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    {data && data?.email ? (
                        <ProfileMenu name={data?.name} picture={data.picture} />
                    ) : (
                        <Button asChild variant="ghost" size="sm" className="text-sm">
                            <Link to="/login">Sign In</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
