/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingButton from "@/components/loading-buttom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
    newPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
});

export default function ResetPassPage() {
    const [param] = useSearchParams()
    const id = param.get("id")
    const token = param.get("token")
    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            newPassword: "",
        },
    });



    const onSubmit = async (data: z.infer<typeof FormSchema>) => {

        if (!id && !token) {
            return toast.error("id & token not found")
        }
        const passInfo = {
            id: id!,
            token: token!,
            newPassword: data.newPassword,
        };

        try {
            const res = await resetPassword(passInfo).unwrap();
            if (res.success) {
                toast.success(res.message);
                navigate("/login", { replace: true })
            }
        } catch (error: any) {
            toast.error(error?.data.message)
        }
    };





    return (
        <div className="grid place-content-center  h-screen">

            <Card >
                <CardHeader>
                    <CardTitle className="text-xl">Reset your password</CardTitle>

                </CardHeader>
                <CardContent className="lg:min-w-[400px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This link will expire in 10 minutes.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                isLoading ? <LoadingButton text="Submit" /> : <Button type="submit">Submit</Button>

                            }
                        </form>
                    </Form>
                </CardContent>

            </Card>

        </div>
    );
}