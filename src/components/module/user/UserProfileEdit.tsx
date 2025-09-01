/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-buttom";
import { Button } from "@/components/ui/button";
import UploadAvatar from "@/components/upload-avatar";
import { useState } from "react";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useUpdateUserMutation } from "@/redux/features/auth/authApi";

// ✅ Validation schema
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    phone: z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message:
                "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .or(z.literal("")),

    address: z.string().min(1, "Address is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
        message: "Select gender",
    }),
});

const EditUserProfile = ({
    userData,
    open,
    setOpen,
}: {
    userData: any;
    open: boolean;
    setOpen: (bool: boolean) => void;
}) => {
    const [updateUser, { isLoading: uploadLoading }] = useUpdateUserMutation()
    const [image, setImage] = useState<(File | FileMetadata) | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: userData?.name || "",
            phone: userData?.phone || "",
            address: userData?.address || "",
            gender: userData?.gender || "",
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
        if (!userData?._id) {
            return toast.error("User ID not found");
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(values));
        if (image) {
            formData.append("file", image as File);
        }

        try {
            const response = await updateUser({
                data: formData,
                id: userData._id,
            }).unwrap();
            if (response?.success) {
                toast.success(response?.message);
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-center my-5">
                        Edit User Profile
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="h-[65vh] pr-2 overflow-y-auto">
                            <UploadAvatar
                                onChange={setImage}
                                defaultImage={userData?.picture}
                            />

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-3"
                                >
                                    {/* Name */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Phone */}
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Address */}
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Gender */}
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="MALE">Male</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                        <SelectItem value="OTHER">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    {/* Submit */}
                                    {uploadLoading ? (
                                        <LoadingButton text="Submit" />
                                    ) : (
                                        <Button type="submit" className="w-full">
                                            Submit
                                        </Button>
                                    )}
                                </form>
                            </Form>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserProfile;
