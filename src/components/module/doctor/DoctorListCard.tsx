import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { IDoctorList } from "@/types";
import avatarImg from "@/assets/images/avatar.png"
import { Link } from "react-router";

const DoctorListCard = ({ doctor }: { doctor: IDoctorList }) => {
    return (
        <Card
            key={doctor._id}
            className="flex flex-col pt-0  overflow-hidden rounded-2xl border shadow-sm hover:shadow-md transition-all  max-h-[500px] sm:max-h-[450px]"
        >
            {/* Image Section */}
            <div className="w-full h-1/2 bg-gray-50 flex-shrink-0 p-5 pb-0">
                <img
                    src={doctor.user?.picture || avatarImg}
                    className="h-full w-2/3 mx-auto object-fit"
                />
            </div>

            {/* Info Section */}
            <div className="flex flex-col flex-1">
                <CardHeader className="pb-2">
                    <CardTitle className="capitalize text-lg font-semibold truncate">
                        {doctor.user?.name}
                    </CardTitle>
                    <CardDescription>
                        <Badge variant="secondary" className="capitalize">
                            {doctor.specialization?.name}
                        </Badge>
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {doctor.about}
                    </p>
                </CardContent>

                <Separator className="my-2" />

                <CardFooter>
                    <Link to={`../details/${doctor?._id}`}>
                        <Button className="w-full rounded-xl" >
                            View Profile
                        </Button>
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
};

export default DoctorListCard;
