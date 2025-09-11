import { Button } from "@/components/ui/button";
import appoinmentImg from "@/assets/images/appointment_img.png";
import { Link } from "react-router";

const AppoinmentBanner = () => {
    return (
        <div className="bg-primary h-[500px] p-10 md:p-20 flex flex-col md:flex-row items-center relative overflow-hidden rounded-2xl">
            {/* Left Section */}
            <div className="md:w-1/2 space-y-5 text-center md:text-left z-20">
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Book Appointment With 100+ Trusted Doctors
                </h1>
                <Link to="/register">
                    <Button
                        variant="outline"
                        className="rounded-full text-secondary-foreground mt-4"
                    >
                        Create account
                    </Button>
                </Link>
            </div>

            {/* Right Section (Absolute Positioned Image) */}
            <div className="absolute right-20 bottom-0 top-20 md:w-1/2 flex justify-center md:justify-end z-10">
                <img
                    src={appoinmentImg}
                    alt="Doctor Appointment Illustration"
                    className="h-full object-contain"
                />
            </div>
        </div>
    );
};

export default AppoinmentBanner;
