import StatsCard from "@/components/module/stats/StatsCard";
import { useUserStatsQuery } from "@/redux/features/stats/statsApi";
import { Ban, Calendar, Clock, User, UserPlus } from "lucide-react";
import RecentUsers from "@/components/module/admin/RecentUsers";
import Chart from "./Chart";

const Overview = () => {
    const { data } = useUserStatsQuery()

    return (
        <div className="space-y-10">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StatsCard title="Total Users" bgColor="bg-blue-500" value={data?.totalUsers || 0} icon={<User />} />
                <StatsCard title="Blocked Users" bgColor="bg-red-500" value={data?.totalBlockedUsers || 0} icon={<Ban />} />
                <StatsCard title="New Users (7d)" bgColor="bg-green-500" value={data?.newUsersInLast7Days || 0} icon={<UserPlus />} />
                <StatsCard title="New Users (30d)" bgColor="bg-purple-500" value={data?.newUsersInLast30Days || 0} icon={<Calendar />} />
                <StatsCard title="Pending Requests" bgColor="bg-yellow-500" value={data?.totalPending || 0} icon={<Clock />} />
            </div>
            <Chart data={data?.usersByRole || []} />
            <RecentUsers />
        </div>
    );
};

export default Overview;