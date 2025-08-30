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
import PermitDoctorDialog from "@/components/module/auth/admin/PermitDoctorDialog";

const AddDoctorPage = () => {
    const { data, isLoading } = useGetAllPendingReqQuery(undefined)
    const [openPermitDialog, setOpenPermitDialog] = useState(false)
    const [userId, setUserId] = useState<string | null>()

    if (isLoading) {
        return <p>loading</p>
    }

    const handlePromot = (userId: string) => {
        setOpenPermitDialog(true)
        setUserId(userId)
    }
    return (
        <div>
            <Table>
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
                            <TableRow>
                                <TableCell>{user.picture}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell >{user.role}</TableCell>
                                <TableCell >
                                    <div className="flex gap-10">
                                        <X className="bg-red-50 text-red-700 rounded-full w-10 h-10 p-2" />
                                        <Alert onConfirm={() => handlePromot(user?._id as string)} title="Are you sure to permit DOCTOR?">
                                            <Check className="bg-primary/20 text-primary rounded-full w-10 h-10 p-2" />
                                        </Alert>
                                    </div>
                                </TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </Table>
            <PermitDoctorDialog userId={userId} open={openPermitDialog} setOpen={setOpenPermitDialog} />
        </div>
    );
};

export default AddDoctorPage;