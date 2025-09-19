import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import homeBanner from "@/assets/images/homeBanner.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react"

const Banner = () => {
    return (
        <section className="relative min-h-[calc(100vh-100px)] bg-primary dark:bg-gray-950 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12">
            {/* Left content */}
            <div className="space-y-6 md:max-w-2xl z-10">
                <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-4xl lg:text-6xl font-bold text-white md:text-left text-center leading-tight">
                    Book Appointment <br />
                    With Trusted Doctors
                </motion.h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Avatar group */}
                    <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="Doctor Shadcn"
                                loading="lazy"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/leerob.png"
                                alt="Doctor Leerob"
                                loading="lazy"
                            />
                            <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt="Doctor Evilrabbit"
                                loading="lazy"
                            />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                        Simply browse through our extensive list of trusted doctors and
                        schedule your appointment hassle-free.
                    </p>
                </div>
                <Link to="/all-doctor">
                    <Button className="bg-white text-black/80 cursor-pointer">Book Appoinment <ArrowRight /></Button>
                </Link>
            </div>

            {/* Right image */}
            <div className="mt-10 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0 w-full max-w-lg">
                <motion.img
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    src={homeBanner}
                    alt="Healthcare banner"
                    className="w-full object-cover drop-shadow-xl"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default Banner;
