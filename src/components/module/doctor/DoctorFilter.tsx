import { useGetAllSpecializationQuery } from "@/redux/features/doctor/doctorApi";

const DoctorFilter = () => {
    const { data, isLoading } = useGetAllSpecializationQuery();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <aside className="w-1/5 min-h-screen bg-gray-100 p-4 border-r space-y-4">
            <h2 className="text-xl font-semibold mb-4">Filter by Specialization</h2>
            <ul className="space-y-2">
                {data?.map(item => (
                    <li
                        key={item._id}
                        className="cursor-pointer p-2 rounded-lg border border-primary capitalize hover:bg-gray-100 transition"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default DoctorFilter;
