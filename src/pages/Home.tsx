import AppoinmentBanner from "@/components/module/Home/AppoinmentBanner";
import Banner from "@/components/module/Home/Banner";
import ChatBotDialog from "@/components/module/Home/Chat";
import Speciality from "@/components/module/Home/Speciality";
import TopDoctors from "@/components/module/Home/TopDoctors";

const Home = () => {
    return (
        <div className="space-y-28">
            <Banner />
            <Speciality />
            <TopDoctors />
            <AppoinmentBanner />
            <ChatBotDialog/>
        </div>
    );
};

export default Home;