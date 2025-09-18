import {
    BookMarked,
    ChevronDownIcon,
    SquareUser,
    LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { useAppDispatch } from "@/redux/hooks";
import { authApi, useLogoutMutation } from "@/redux/features/auth/authApi";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export default function ProfileMenu({ name, picture }: { name: string, picture: string }) {
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        await logout(null);
        dispatch(authApi.util.resetApiState());
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 px-2 py-1.5">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={picture} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <ChevronDownIcon className="opacity-60" size={16} aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link to="/profile">
                    <DropdownMenuItem>
                        <SquareUser size={16} className="opacity-60 mr-2" />
                        Profile
                    </DropdownMenuItem>
                </Link>

                <Link to="/bookings">
                    <DropdownMenuItem>
                        <BookMarked size={16} className="opacity-60 mr-2" />
                        All Booking
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut size={16} className="opacity-60 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
