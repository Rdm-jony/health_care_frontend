/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllPendingReqQuery } from "@/redux/features/auth/authApi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, X } from "lucide-react";
import { Alert } from "@/components/AlertDialog";
import { useState } from "react";
import PermitDoctorDialog from "@/components/module/admin/PermitDoctorDialog";
import { useRejectRequestMutation } from "@/redux/features/doctor/doctorApi";
import { toast } from "sonner";

const AddDoctorPage = () => {
    const { data, isLoading } = useGetAllPendingReqQuery(undefined)
    const [requestReject] = useRejectRequestMutation()
    const [openPermitDialog, setOpenPermitDialog] = useState(false)
    const [userId, setUserId] = useState<string | null>()

    if (isLoading) {
        return <p>loading</p>
    }

    const hanldeReject = async (userId: string) => {
        console.log(userId)
        try {
            const response = await requestReject(userId).unwrap()
            if (response.success) {
                toast.warning(response?.message)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message)
        }
    }

    const handlePromot = (userId: string) => {
        setOpenPermitDialog(true)
        setUserId(userId)
    }
    return (
        <div>
            <Table className="dark:bg-gray-950">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead >Role</TableHead>
                        <TableHead >Permit To Doctor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        Array.isArray(data) && data.map((user) => (
                            <TableRow key={user?._id} >
                                <TableCell>{user.picture}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell >{user.role}</TableCell>
                                <TableCell >
                                    <div className="flex gap-10">
                                        <Alert onConfirm={() => hanldeReject(user?._id as string)} title="Are sure reject the request?" type="delete" btnText="Reject">
                                            <X className="bg-red-50 text-red-700 rounded-full w-10 h-10 p-2" />
                                        </Alert>
                                        <Alert onConfirm={() => handlePromot(user?._id as string)} title="Are you sure to permit DOCTOR?" type="accept" btnText="Approve">
                                            <Check className="bg-primary/20 text-primary rounded-full w-10 h-10 p-2" />
                                        </Alert>
                                    </div>
                                </TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </Table>
            <PermitDoctorDialog userId={userId as string} open={openPermitDialog} setOpen={setOpenPermitDialog} />
        </div>
    );
};

export default AddDoctorPage;