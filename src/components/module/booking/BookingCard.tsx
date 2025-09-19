/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { IBooking } from "@/types"
import { format } from "date-fns"
import { convertToBDTime } from "@/utils/converBdTimeZone"
import { useInitPaymentMutation } from "@/redux/features/payment/paymentApi"
import { toast } from "sonner"
import { bookingStatus } from "@/constants/booingStatus"
import LoadingButton from "@/components/loading-buttom"

interface BookingCardProps {
    booking: IBooking

}

export default function BookingCard({ booking }: BookingCardProps) {
    const [initPayment, { isLoading }] = useInitPaymentMutation()
    const doctor = typeof booking.doctor === "string" ? null : booking.doctor

    const handlePayment = async (bookingId: string) => {
        try {
            const response = await initPayment(bookingId).unwrap()
            if (response.success) {
                window.location.href = response.data
            }

        } catch (error: any) {
            toast.error(error?.data.message)
        }
    }

    return (
        <Card className="w-full shadow-md rounded-2xl border overflow-hidden p-5">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="w-1/2 flex gap-20">
                    {doctor && (
                        <div className="w-1/5 h-[150px]">
                            <img
                                src={doctor.user.picture}
                                alt={doctor.user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        {doctor && (
                            <>
                                <h3 className="font-semibold text-lg">{doctor.user.name}</h3>
                                <p className="text-sm text-gray-500">{doctor.specialization}</p>
                            </>
                        )}

                        <p className="text-sm">
                            <strong>Time:</strong> {convertToBDTime(booking.startTime)} - {convertToBDTime(booking.endTime)}
                        </p>

                        {doctor && (
                            <p className="text-sm">
                                <strong>Fees:</strong> ${doctor.fees}
                            </p>
                        )}

                        <p className="text-sm">
                            <strong>Date:</strong> {format(booking?.createdAt as Date, "Pp")}
                        </p>

                        {booking.status && (
                            <p className="text-sm">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`${booking.status === "PENDING"
                                        ? "text-yellow-600"
                                        : booking.status === bookingStatus.complete || booking.status === bookingStatus.cash
                                            ? "text-green-600"
                                            : "text-red-600"
                                        } font-medium`}
                                >
                                    {booking.status}
                                </span>
                            </p>
                        )}
                    </div>

                </div>

                {/* Buttons */}
                {
                    booking.status == bookingStatus.cash || booking.status == bookingStatus.complete ? <Button variant="outline" className="text-primary">Confirmed</Button> : <div className="flex flex-col gap-5">
                        {
                            isLoading ? <LoadingButton text="Pay" /> : <Button onClick={() => handlePayment(booking._id as string)} variant="default" >
                                Pay
                            </Button>
                        }

                        <Button variant="destructive">
                            Cancel
                        </Button>
                    </div>
                }

            </CardContent>

        </Card>
    )
}
