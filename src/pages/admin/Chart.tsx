import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type RoleData = {
    _id: string
    count: number
}

type ChartProps = {
    data: RoleData[]
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"] // Tailwind colors

export default function Chart({ data }:ChartProps) {
    return (
        <div className="bg-white shadow rounded-2xl p-4 grow">
            <h2 className="text-lg font-semibold mb-4">Users by Role</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60} // donut style
                        label
                    >
                        {data?.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
