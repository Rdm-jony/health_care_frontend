import type { ReactNode } from "react"

type StatsCardProps = {
    title: string
    value: number | string
    icon?: ReactNode
    bgColor?: string // Tailwind classes for bg color
}

const StatsCard = ({ title, value, icon, bgColor }: StatsCardProps) => {
    return (
        <div
            className={`flex items-center justify-between p-4 shadow rounded-2xl text-white ${bgColor}`}
        >
            <div>
                <p className="text-sm opacity-80">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
            <div className="text-3xl opacity-90">{icon}</div>
        </div>
    )
}

export default StatsCard
