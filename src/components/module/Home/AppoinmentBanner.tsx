import { Button } from "@/components/ui/button";
import appoinmentImg from "@/assets/images/appointment_img.png";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AppoinmentBanner = () => {
    return (
        <div className="bg-primary dark:bg-gray-950 h-[500px] p-10 md:p-20 flex flex-col md:flex-row items-center relative overflow-hidden rounded-2xl">

            {/* Left Section */}
            <motion.div
                className="md:w-1/2 space-y-5 text-center md:text-left z-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Book Appointment With 100+ Trusted Doctors
                </h1>
                <Link to="/register">
                    <Button
                        variant="outline"
                        className="rounded-full text-secondary-foreground mt-4 cursor-pointer"
                    >
                        Create account
                    </Button>
                </Link>
            </motion.div>

            {/* Right Section (Floating Image) */}
            <motion.div
                className="absolute right-20 bottom-0 top-20 md:w-1/2 flex justify-center md:justify-end z-10"
                initial={{ y: 20 }}
                whileInView={{ y: [0, -10, 0] }} // floating animation
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <img
                    src={appoinmentImg}
                    alt="Doctor Appointment Illustration"
                    className="h-full object-contain"
                />
            </motion.div>
        </div>
    );
};

export default AppoinmentBanner;
