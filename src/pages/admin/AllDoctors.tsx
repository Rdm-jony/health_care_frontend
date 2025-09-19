import StatsCard from "@/components/module/stats/StatsCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { useDoctorStatsQuery } from "@/redux/features/stats/statsApi";
import type { IDoctorList } from "@/types";
import { Ban, Calendar, Search, User, UserPlus } from "lucide-react";
import { useState } from "react";

const AllDoctors = () => {
    const { data } = useDoctorStatsQuery()
    const [searchTerm, setSearchTerm] = useState("")
    const { data: doctorInfo } = useAllDoctorsQuery({ limit: 1000, searchTerm })



    const doctors: IDoctorList[] = Array.isArray(doctorInfo?.data) ? doctorInfo.data : []
    console.log(doctors)
    return (
        <div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StatsCard title="Total Doctors" bgColor="bg-blue-500" value={data?.totalDoctors || 0} icon={<User />} />
                <StatsCard title="Blocked Doctors" bgColor="bg-red-500" value={data?.totalBlockedDoctors || 0} icon={<Ban />} />
                <StatsCard title="New Doctor (7d)" bgColor="bg-green-500" value={data?.newDoctorsInLast7Days || 0} icon={<UserPlus />} />
                <StatsCard title="New Doctors (30d)" bgColor="bg-purple-500" value={data?.newDoctorsInLast30Days || 0} icon={<Calendar />} />
            </div>
            <div className="relative bg-white dark:bg-gray-900 w-1/3 mt-10">
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {doctors?.map((doctor) => (
                        <TableRow key={doctor._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={doctor.user.picture || ""} alt={doctor.user.name} />
                                    <AvatarFallback>
                                        {doctor.user.name ? doctor.user.name.charAt(0) : "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium capitalize">{doctor.user.name}</TableCell>
                            <TableCell>{doctor.user.email}</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                                    {doctor.user.role}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllDoctors;