import { role } from "@/constants/role";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import UserProfile from "./user/UserProfile";
import DoctorProfile from "./doctor/DoctorProfile";

const Profile = () => {
    const { data, isLoading } = useGetMeQuery(undefined)
    if (isLoading) {
        return <p>loading.........</p>
    }
    switch (data.role) {
        case role.DOCTOR:
            return <DoctorProfile />

        default:
            return <UserProfile />
    }
};

export default Profile;