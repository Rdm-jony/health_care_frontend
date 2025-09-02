/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDoctorBookingSlotQuery } from "@/redux/features/doctor/doctorApi";
import { Alert } from "@/components/AlertDialog";
import type { IBooking, IDoctorList } from "@/types";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";
import { convertToBDTime } from "@/utils/converBdTimeZone";

export default function DoctorSlots({ doctor }: { doctor: Partial<IDoctorList> }) {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
    });

    const [booking, { isLoading: bookedLoader }] = useCreateBookingMutation();
    const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().split("T")[0]);
    const { data: slots, isLoading } = useGetDoctorBookingSlotQuery(
        { id: doctor?._id as string, date: selectedDate },
        { skip: !selectedDate }
    );

    const [openAlert, setOpenAlert] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    const handleBooking = async () => {
        if (!doctor?._id || !selectedSlot) return toast.error("Doctor or slot not found");

        // Only send HH:mm format to backend
        const data: IBooking = {
            doctor: doctor._id,
            startTime: selectedSlot.startTime, // "16:40"
            endTime: selectedSlot.endTime,     // "16:50"
        };

        try {
            const response = await booking(data).unwrap();
            if (response.success) {
                toast.success(response.message);
                setOpenAlert(false);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Booking failed");
        }
    };

    return (
        <Card className="mt-6 shadow-xl border rounded-2xl">
            <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Book Appointment</h2>

                {/* Date Buttons */}
                <div className="flex gap-2 overflow-x-auto">
                    {next7Days.map((date, idx) => {
                        const formatted = date.toISOString().split("T")[0];
                        return (
                            <Button
                                key={idx}
                                variant={selectedDate === formatted ? "default" : "outline"}
                                onClick={() => setSelectedDate(formatted)}
                                className="min-w-[100px]"
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-bold">
                                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                                    </span>
                                    <span className="text-xs">
                                        {date.getDate()}{" "}
                                        {date.toLocaleDateString("en-US", { month: "short" })}
                                    </span>
                                </div>
                            </Button>
                        );
                    })}
                </div>

                {/* Slots */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                    {isLoading && <p className="text-gray-500">Loading slots...</p>}
                    {slots?.length === 0 && !isLoading && <p className="text-gray-500">No slots available on this date.</p>}

                    {slots?.map((slot, idx) => {
                        const start = convertToBDTime(slot.startTime);
                        const end = convertToBDTime(slot.endTime);

                        return (
                            <Alert
                                key={idx}
                                loading={bookedLoader}
                                open={openAlert && selectedSlot === slot}
                                setOpen={setOpenAlert}
                                onConfirm={handleBooking}
                                btnText="Confirm"
                                title="Are you sure to book this slot?"
                                type="accept"
                                description={
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Doctor:</strong> {doctor?.user?.name}</p>
                                        <p><strong>Slot:</strong> {start} - {end}</p>
                                        <p><strong>Fees:</strong> ${doctor?.fees}</p>
                                    </div>
                                }
                            >
                                <Button
                                    variant="outline"
                                    className="text-muted-foreground"
                                    onClick={() => {
                                        setSelectedSlot(slot);
                                        setOpenAlert(true);
                                    }}
                                >
                                    {start} - {end}
                                </Button>
                            </Alert>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
