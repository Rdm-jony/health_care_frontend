/* eslint-disable @typescript-eslint/no-explicit-any */
import EditDoctorsProfile from "@/components/module/doctor/DoctorProfileEdit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";

const DoctorProfile = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { data, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }


    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Card>
                <CardHeader className="flex justify-between items-center gap-4">
                    <div className="flex gap-20">
                        <div className="w-20 h-20">
                            {
                                data?.picture ? <img
                                    className="size-full object-cover"
                                    src={data?.picture}

                                    style={{ objectFit: "cover" }}
                                /> : <p>{data?.email[0]}</p>
                            }
                        </div>
                        <div>
                            <CardTitle className="capitalize text-2xl">{data?.name}</CardTitle>
                            <p className="text-muted-foreground text-sm">{data?.email}</p>
                        </div>
                    </div>

                    {
                        data && <Button onClick={() => setOpenDialog(true)}>
                            Edit
                        </Button>
                    }


                </CardHeader>

                <CardContent className="space-y-6">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="text-muted-foreground">{data?.about}</p>
                    </div>

                    <Separator />

                    {/* Profile Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Specialization</h4>
                            <p className="capitalize">{data?.specialize}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Experience</h4>
                            <p>{data?.experience} years</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Degree</h4>
                            <p>{data?.degree}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Fees</h4>
                            <p>${data?.fees}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Licence No.</h4>
                            <p>{data?.licenceNumber}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                            <p className="capitalize">{data?.role}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Gender</h4>
                            <p className="capitalize">{data?.gender || "Not specified"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                            <p>{data?.phone || "Not provided"}</p>
                        </div>
                        <div className="col-span-2">
                            <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                            <p>{data?.address || "Not provided"}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Available Times */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Available Times</h3>
                        {data?.availableTimes?.length > 0 ? (
                            <ul className="space-y-2">
                                {data.availableTimes.map((slot: any, index: number) => (
                                    <li key={index} className="border p-3 rounded-md bg-muted">
                                        <p className="font-medium">{slot.day}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {slot.startTime} - {slot.endTime} | {slot.slotDuration} min slots
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">No available times set.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            <EditDoctorsProfile open={openDialog} setOpen={setOpenDialog} doctorData={data} />
        </div>
    );
};

export default DoctorProfile;
