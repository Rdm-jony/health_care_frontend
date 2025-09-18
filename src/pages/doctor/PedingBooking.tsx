/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCashBookingMutation, useGetDoctorBookingQuery } from "@/redux/features/booking/bookingApi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bookingStatus } from "@/constants/booingStatus";
import { convertToBDTime } from "@/utils/converBdTimeZone";
import { Check, X } from "lucide-react";
import { Alert } from "@/components/AlertDialog";
import { toast } from "sonner";


const PedingBooking = () => {
    const { data } = useGetDoctorBookingQuery({ status: "PENDING" });
    const [cashBooking, { isLoading }] = useCashBookingMutation()
    const handleCashBooking = async (bookingId: string) => {
        if (!bookingId) {
            return toast.error("booking id not found")
        }
        try {
            const response = await cashBooking(bookingId).unwrap()
            if (response.success) {
                toast.success(response.message)
            }
        } catch (error:any) {
            toast.error(error?.data.message)
        }
    }

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Slot</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data && data?.map(item => <TableRow className="bg-gray-900">
                        <TableCell className="font-medium">
                            {
                                "object" == typeof item.user && <div className="flex gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage src={item.user!.picture} alt="@shadcn" />
                                        <AvatarFallback>{item.user!.email[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="capitalize">{item.user.name}</p>
                                </div>
                            }

                        </TableCell>

                        <TableCell className={cn(item.status == bookingStatus.pending && "text-orange-500")}>{item.status}</TableCell>
                        <TableCell>{format(item.bookingDate as Date, "PP")}</TableCell>
                        <TableCell>{convertToBDTime(item.startTime)} - {convertToBDTime(item.endTime)}</TableCell>
                        <TableCell className="flex gap-5">
                            <X className="bg-red-50 text-red-700 rounded-full w-10 h-10 p-2" />
                            <Alert btnText="Confirm" onConfirm={() => handleCashBooking(item?._id as string)} title="Are you sure to confirm booking with Cash" type="accept" loading={isLoading} >
                                <Check className="bg-primary/20 text-primary rounded-full w-10 h-10 p-2" />
                            </Alert>
                        </TableCell>
                    </TableRow>)
                }

            </TableBody>
        </Table>
    );
};

export default PedingBooking;