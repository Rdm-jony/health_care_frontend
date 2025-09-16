import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { IDoctorList } from "@/types";
import avatarImg from "@/assets/images/avatar.png"
import { Link } from "react-router";

const DoctorListCard = ({ doctor }: { doctor: IDoctorList }) => {
    return (
        <Link to={`/details/${doctor._id}`} className="w-full">
            <Card
                key={doctor._id}
                className="flex  flex-col pt-0 h-[350px]  overflow-hidden rounded-2xl border shadow-sm hover:shadow-md transition-all  max-h-[500px] sm:max-h-[450px]"
            >
                {/* Image Section */}
                <div className="w-full h-2/3 bg-gray-50 flex-shrink-0 p-5 pb-0">
                    <img
                        src={doctor.user?.picture || avatarImg}
                        className="h-full mx-auto object-fit"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1">
                    <CardHeader className="pb-2">
                        <p className="flex items-center gap-2"><span className="block h-2 w-2 rounded-full bg-green-400"></span> <span className="text-green-400 font-semibold text-sm">Available</span></p>
                        <CardTitle className="capitalize text-lg font-semibold truncate">
                            {`Dr. ${doctor.user?.name}`}
                        </CardTitle>
                        <CardDescription>
                            <p className="capitalize font-semibold">  {doctor.specialization?.name}</p>
                        </CardDescription>
                    </CardHeader>
                </div>
            </Card>
        </Link>
    );
};

export default DoctorListCard;
