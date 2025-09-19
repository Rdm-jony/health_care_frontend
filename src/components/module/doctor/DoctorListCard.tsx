import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IDoctorList } from "@/types";
import avatarImg from "@/assets/images/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router";

const DoctorListCard = ({ doctor }: { doctor: IDoctorList }) => {
  return (
    <Link to={`/details/${doctor._id}`} className="w-full">
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }} // smooth lift + scale
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full"
      >
        <Card
          key={doctor._id}
          className="flex flex-col pt-0 h-[350px] overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition-shadow max-h-[500px] sm:max-h-[450px]"
        >
          {/* Image Section */}
          <div className="w-full h-2/3 bg-gray-50 dark:bg-gray-950 flex-shrink-0 p-5 pb-0">
            <img
              src={doctor.user?.picture || avatarImg}
              className="h-full mx-auto object-contain"
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col flex-1">
            <CardHeader className="pb-2">
              <p className="flex items-center gap-2">
                <span className="block h-2 w-2 rounded-full bg-green-400"></span>{" "}
                <span className="text-green-400 font-semibold text-sm">Available</span>
              </p>
              <CardTitle className="capitalize text-lg font-semibold truncate">
                {`Dr. ${doctor.user?.name}`}
              </CardTitle>
              <CardDescription>
                <p className="capitalize font-semibold">{doctor.specialization?.name}</p>
              </CardDescription>
            </CardHeader>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default DoctorListCard;
