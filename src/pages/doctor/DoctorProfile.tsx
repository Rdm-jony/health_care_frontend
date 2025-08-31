/* eslint-disable @typescript-eslint/no-explicit-any */
import EditDoctorsProfile from "@/components/module/doctor/DoctorProfileEdit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UploadAvatar from "@/components/upload-avatar";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useUpdateDoctorProfileMutation } from "@/redux/features/doctor/doctorApi";
import { useState } from "react";
import { toast } from "sonner";

const DoctorProfile = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [image, setImage] = useState<(File | FileMetadata) | null>(null);

    const { data, isLoading } = useGetMeQuery(undefined);
    const [updateDoctor, { isLoading: uploadLoading }] = useUpdateDoctorProfileMutation()

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    const uploadPicture = async () => {
        if (!data?._id) {
            return toast.error("id not found")
        }
        const formData = new FormData()
        formData.append("file", image as File)
        try {
            const response = await updateDoctor({ data: formData, id: data?._id }).unwrap()
            if (response?.success) {
                toast.success(response?.message)
                setImage(null)
            }
        } catch (error: any) {
            toast.error(error?.data.message)
        }

    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Card>
                <CardHeader className="flex justify-between items-center gap-4">
                    <div className="flex gap-20">
                        <UploadAvatar onChange={setImage} defaultImage={data?.picture} />

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
                <div className="ml-5">
                    {
                        image ? <Button variant="outline" disabled={uploadLoading} onClick={uploadPicture}>save Image</Button> : ""
                    }
                </div>
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
