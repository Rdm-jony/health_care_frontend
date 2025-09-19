import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi"
import type { IUser } from "@/types"




export default function RecentUsers() {
    const { data, isLoading } = useGetAllUsersQuery({ limit: 5 })
    if (isLoading) {
        return <p>loading....</p>
    }
    const users: IUser[] = Array.isArray(data?.data) ? data.data : []
    return (
        <div className="bg-white dark:bg-gray-950 shadow rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
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
    )
}
