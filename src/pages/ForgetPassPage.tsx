/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingButton from "@/components/loading-buttom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
    email: z.email()
})

const ForgetPassPage = ({ open, setOpen }: { open: boolean, setOpen: (bool:boolean) => void }) => {
    const [sendResetEmail, { isLoading }] = useForgetPasswordMutation();

    const handleSendEmail = async () => {


    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const res = await sendResetEmail({ email: data?.email }).unwrap();
            if (res.success) {
                toast.success("reset email Sent");
                setOpen(false)
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data.message)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen} >
          
            <DialogContent className="min-w-fit">
                <DialogHeader>
                    <DialogDescription>
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">Forget your passowrd?</CardTitle>
                                <CardDescription>
                                    We will send you an an link at <br /> {""}
                                </CardDescription>

                                <Form {...form}>
                                    <form id="forgetPassForm" onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="email" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </CardHeader>
                            <CardFooter className="flex ">
                                {
                                    isLoading ? <LoadingButton text="Confirm" /> : <Button form="forgetPassForm" onClick={handleSendEmail} className="w-full">
                                        Confirm
                                    </Button>
                                }
                            </CardFooter>
                        </Card>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ForgetPassPage;