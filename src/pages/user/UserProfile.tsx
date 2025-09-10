/* eslint-disable @typescript-eslint/no-explicit-any */
import EditUserProfile from "@/components/module/user/UserProfileEdit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { doctorRequest } from "@/constants/doctorRequest";
import { role } from "@/constants/role";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useSendDoctorRequestMutation } from "@/redux/features/doctor/doctorApi";
import { useState } from "react";
import { toast } from "sonner";

const UserProfile = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [sendDoctorRequest] = useSendDoctorRequestMutation()

    const { data: user, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    const handleSendDoctorRequest = async () => {
        try {
            const response = await sendDoctorRequest(undefined).unwrap()
            if (response.success) {
                toast.success(response.success)
            }
        } catch (error: any) {
            toast.error(error?.data.message)
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Card>
                <CardHeader className="flex justify-between items-center gap-4">
                    <div className="flex gap-6 items-center">
                        <div className="w-20 h-20">
                            {user?.picture ? (
                                <img
                                    className="size-full object-cover rounded-full"
                                    src={user?.picture}
                                    alt="profile"
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-muted text-lg font-semibold">
                                    {user?.email?.[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <CardTitle className="capitalize text-2xl">
                                {user?.name}
                            </CardTitle>
                            <p className="text-muted-foreground text-sm">{user?.email}</p>
                        </div>
                    </div>

                    {user && <Button onClick={() => setOpenDialog(true)}>Edit</Button>}
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Profile Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                            <p className="capitalize">{user?.role}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Verified
                            </h4>
                            <p>{user?.isVerified ? "Yes" : "No"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Deleted
                            </h4>
                            <p>{user?.isDeleted ? "Yes" : "No"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Phone
                            </h4>
                            <p>{user?.phone || "Not provided"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Gender
                            </h4>
                            <p className="capitalize">
                                {user?.gender || "Not specified"}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Address
                            </h4>
                            <p>{user?.address || "Not provided"}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Doctor Request Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Doctor Request</h3>
                        {user?.role === role.USER ?
                            (
                                user?.permitToDoctor === doctorRequest.PENDING ? (
                                    <p className="text-yellow-600 font-medium">
                                        Your request to become a doctor is pending admin approval.
                                    </p>
                                ) : user?.doctorRequestStatus === doctorRequest.REJECTED ? (
                                    <p className="text-red-600 font-medium">
                                        Your request to become a doctor was rejected.
                                    </p>
                                ) : (
                                    <Button onClick={handleSendDoctorRequest}>
                                        Send Request to Become Doctor
                                    </Button>
                                )
                            ) : (
                                <p className="text-green-600 font-medium">
                                    You are already a doctor.
                                </p>
                            )}
                    </div>

                    <Separator />

                    {/* Auth Providers */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                        {user?.auth?.length > 0 ? (
                            <ul className="space-y-2">
                                {user.auth.map((provider: any, index: number) => (
                                    <li
                                        key={index}
                                        className="border p-3 rounded-md bg-muted"
                                    >
                                        <p className="font-medium capitalize">
                                            Provider: {provider.provider}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            ID: {provider.providerId}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">
                                No authentication methods.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
            <EditUserProfile
                open={openDialog}
                setOpen={setOpenDialog}
                userData={user}
            />
        </div>
    );
};

export default UserProfile;
