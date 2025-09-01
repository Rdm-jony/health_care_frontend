/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetAllSpecializationQuery, usePermitDoctorMutation } from "@/redux/features/doctor/doctorApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { CircleMinus, CirclePlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loading-buttom";
import { toast } from "sonner";


const formSchema = z.object({
    about: z.string().min(1, "About is required"),

    availableTimes: z
        .array(
            z
                .object({
                    day: z.enum([
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                    ]),
                    startTime: z
                        .string()
                        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
                    endTime: z
                        .string()
                        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
                    slotDuration: z.coerce
                        .number()
                        .min(5, "Minimum slot duration is 5 minutes")
                        .max(120, "Maximum slot duration is 120 minutes"),
                })
                .refine(
                    (time) => {
                        const [sh, sm] = time.startTime.split(":").map(Number);
                        const [eh, em] = time.endTime.split(":").map(Number);
                        const start = sh * 60 + sm;
                        const end = eh * 60 + em;
                        return end > start;
                    },
                    {
                        message: "endTime must be later than startTime",
                        path: ["endTime"],
                    }
                )
        )
        .nonempty("At least one available slot is required"),

    degree: z.string().min(1, "Degree is required"),

    experience: z.coerce
        .number({ message: "Experience is required" })
        .min(0, "Experience cannot be negative"),

    fees: z.coerce
        .number({ message: "Fees is required" })
        .min(0, "Fees must be a positive number"),

    licenceNumber: z.string().min(1, "Licence number is required"),

    specialization: z.string().min(1, "Specialization is required"),
});



const PermitDoctorDialog = ({ open, setOpen, userId }: { open: boolean, setOpen: (bool: boolean) => void, userId: string }) => {
    const { data: specializations, isLoading: specializeLoading } = useGetAllSpecializationQuery(undefined)
    const [approved, { isLoading }] = usePermitDoctorMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            about: "",
            availableTimes: [{ day: "Monday", startTime: "", endTime: "", slotDuration: 0 }],
            degree: "",
            experience: undefined,
            fees: undefined,
            licenceNumber: "",
            specialization: ""
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "availableTimes", // unique name for your Field Array
    });
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values: z.infer<typeof formSchema>) => {
        if (!userId) {
            return toast.error("User Id not found")
        }
        try {
            console.log({ user: userId, ...values })
            const response = await approved({ user: userId, ...values }).unwrap()
            if (response.success) {
                toast.success(response?.message)
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.data.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-center my-5">Flill Up all ncecessary fields</DialogTitle>
                    <DialogDescription asChild>
                        <ScrollArea className="h-[65vh] pr-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="specialization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Specialize</FormLabel>
                                                <Select disabled={specializeLoading} onValueChange={field.onChange} >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a Specilizaion" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            specializations?.map(item => <SelectItem key={item?._id} value={item?._id as string} className="capitalize">{item?.name}</SelectItem>
                                                            )
                                                        }

                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="licenceNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Licence Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="degree"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Degree</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Expericene</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fees"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fees</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-between">
                                        <p>Available Time Slot</p>
                                        <CirclePlus onClick={() => append({ day: "Monday", startTime: "", endTime: "", slotDuration: 0 })}
                                        />
                                    </div>

                                    <div>
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="space-y-2 border p-4 rounded-md mb-4 flex flex-wrap gap-2 items-center">
                                                <FormField
                                                    control={form.control}
                                                    name={`availableTimes.${index}.day`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Day</FormLabel>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a day" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                                                        <SelectItem key={day} value={day}>{day}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`availableTimes.${index}.startTime`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Start Time</FormLabel>
                                                            <FormControl>
                                                                <Input type="time" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`availableTimes.${index}.endTime`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>End Time</FormLabel>
                                                            <FormControl>
                                                                <Input type="time" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`availableTimes.${index}.slotDuration`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Slot Duration (minutes)</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <CircleMinus onClick={() => remove(index)} size={20} className="mt-2 text-red-500" />

                                            </div>
                                        ))}

                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="about"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>About</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        placeholder="Tell us a little bit about yourself"
                                                        className="resize-none border"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {
                                        isLoading ? <LoadingButton text="Submit" /> : <Button type="submit" className="w-full">
                                            Submit
                                        </Button>
                                    }
                                </form>
                            </Form>
                        </ScrollArea>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>

        </Dialog >
    );
};

export default PermitDoctorDialog;