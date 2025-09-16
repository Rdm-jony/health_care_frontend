import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-svh flex flex-col md:max-w-6xl w-full mx-auto">
            <Navbar />
            <div className="grow container mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;