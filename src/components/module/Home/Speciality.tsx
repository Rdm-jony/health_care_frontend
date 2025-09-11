import ComponentTitle from "@/components/ComponentTitlte";
import { useGetAllSpecializationQuery } from "@/redux/features/doctor/doctorApi";
import { Link } from "react-router";

const Speciality = () => {


    const { data } = useGetAllSpecializationQuery()


    return (
        <div>
            <ComponentTitle title="Find by Speciality" subTitle="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free." />
            <div className="flex gap-5 justify-center">
                {
                    data && data?.map(item => (
                        <Link key={item._id} to={`/all-doctor?specialization.name=${item.name}`}>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-primary/10 p-5 border rounded-full">
                                    <img src={item.image} alt="" />
                                </div>
                                <p className="text-sm mt-2 capitalize">{item.name}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Speciality;