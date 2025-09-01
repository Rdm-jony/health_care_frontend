import MobileFilter from "@/components/mobile-doctor-filter";
import DoctorFilter from "@/components/module/doctor/DoctorFilter";
import DoctorListCard from "@/components/module/doctor/DoctorListCard";
import { useAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { useSearchParams } from "react-router";

const AllDoctor = () => {
    const [searchParams] = useSearchParams();
    const specialization = searchParams.get("specialization.name") || undefined;
    const searchTerm = searchParams.get("searchTerm") || undefined;

    const { data: doctors, isLoading } = useAllDoctorsQuery({ "specialization.name": specialization, searchTerm })
    if (isLoading) {
        return <p>loading....</p>
    }
    return (
        <div className="md:flex">
            <DoctorFilter />
            <MobileFilter />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 md:p-10">
                {
                    doctors?.data?.map(doctor => <DoctorListCard key={doctor._id} doctor={doctor} />)
                }
            </div>
        </div>
    );
};

export default AllDoctor;