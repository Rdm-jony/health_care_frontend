import StatsCard from "@/components/module/stats/StatsCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { useUserStatsQuery } from "@/redux/features/stats/statsApi";
import type { IUser } from "@/types";
import { Ban, Calendar, Search, User, UserPlus } from "lucide-react";
import {  useState } from "react";

const AllUsers = () => {
    const { data } = useUserStatsQuery()
    const [searchTerm, setSearchTerm] = useState("")
    const { data: usersInfo } = useGetAllUsersQuery({ limit: 1000, role: "USER", searchTerm })
    const users: IUser[] = Array.isArray(usersInfo?.data) ? usersInfo.data : []



    return (
        <div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StatsCard title="Total Users" bgColor="bg-blue-500" value={data?.totalUsers || 0} icon={<User />} />
                <StatsCard title="Blocked Users" bgColor="bg-red-500" value={data?.totalBlockedUsers || 0} icon={<Ban />} />
                <StatsCard title="New Users (7d)" bgColor="bg-green-500" value={data?.newUsersInLast7Days || 0} icon={<UserPlus />} />
                <StatsCard title="New Users (30d)" bgColor="bg-purple-500" value={data?.newUsersInLast30Days || 0} icon={<Calendar />} />
            </div>
            <div className="relative bg-white dark:bg-gray-900 w-1/3 mt-10">
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // ✅ controlled input
                    className="peer ps-9"
                    placeholder="Search by name"
                    type="text"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
                    <Search size={16} aria-hidden="true" />
                </div>
            </div>
            <Table className="dark:bg-gray-950">
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={user.picture || ""} alt={user.name} />
                                    <AvatarFallback>
                                        {user.name ? user.name.charAt(0) : "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium capitalize">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                                    {user.role}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllUsers;