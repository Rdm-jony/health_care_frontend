import {
    BookMarked,
    ChevronDownIcon,
    SquareUser,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"
import { useAppDispatch } from "@/redux/hooks"
import { authApi, useLogoutMutation } from "@/redux/features/auth/authApi"

export default function ProfileMenu() {
    const dispatch = useAppDispatch()

    const [logout] = useLogoutMutation()
    const handleLogout = async () => {
        await logout(null)
        dispatch(authApi.util.resetApiState())
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    profile
                    <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link to="/profile">
                    <DropdownMenuItem>
                        <SquareUser size={16} className="opacity-60" aria-hidden="true" />
                        Profile
                    </DropdownMenuItem>
                </Link>

                <Link to="/bookings">
                    <DropdownMenuItem>
                        <BookMarked size={16} className="opacity-60" aria-hidden="true" />
                        All Booking
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuItem onClick={handleLogout}>
                    <BookMarked size={16} className="opacity-60" aria-hidden="true" />
                    Logout
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}
