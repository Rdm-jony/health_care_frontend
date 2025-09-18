import ComponentTitle from "@/components/ComponentTitlte";
import { useAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import DoctorListCard from "../doctor/DoctorListCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import DoctorCardSkeleton from "@/components/DoctorCardSkeleton";

const TopDoctors = () => {
  const { data: doctors, isLoading } = useAllDoctorsQuery({ limit: 4 });

  return (
    <div>
      <ComponentTitle
        title="Top Doctors to Book"
        subTitle="Simply browse through our extensive list of trusted doctors."
      />

      <div className="flex gap-10 md:flex-nowrap flex-wrap">
        {isLoading ? (
          // 🔹 Skeletons while loading
          Array.from({ length: 4 }).map((_, i) => (
           <DoctorCardSkeleton key={i}/>
          ))
        ) : (
          doctors &&
          doctors.data.map((doctor) => (
            <DoctorListCard key={doctor._id} doctor={doctor} />
          ))
        )}
      </div>

      <div className="flex justify-center">
        <Link to="/all-doctor">
          <Button className="mt-10 cursor-pointer" variant="outline">
            See More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopDoctors;
