/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import doctorImg from "@/assets/images/doctor.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Logo from "@/assets/images/Logo";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import LoadingButton from "@/components/loading-buttom";
import {  useState } from "react";
import ForgetPassPage from "@/pages/ForgetPassPage";
import config from "@/config";



const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "password is required")
})

export function LoginForm() {
  const location = useLocation()
  console.log(location.state)
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [openForgetPassDialog, setOpenForgetPassDialog] = useState<boolean>(false)




  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      const response = await login(data).unwrap()
      if (response?.success) {
        toast.success(response?.message)
        navigate(location?.state ?? "/")
      }
    } catch (error: any) {
      toast.error(error?.data.message)
      if (error?.data.message === "User is not verified") {
        navigate("/verify", { state: data?.email });
      }
    }
  }

  const handleGoogle = async () => {
    if (location.state) {
      window.location.href = `http://localhost:5000/api/v1/auth/google?redirect=${location.state}`;
    } else {
      window.location.href = `http://localhost:5000/api/v1/auth/google`;

    }

  }

  const loginWithDemoDoctor = async () => {
    try {
      const response = await login({ email: config.demoDoctorEmail, password: config.demoDoctorPass }).unwrap()
      if (response?.success) {
        toast.success(response?.message)
        navigate("/")
      }
    } catch (error: any) {
      toast.error(error?.data.message)

    }
  }
  const loginWithDemoAdmin = async () => {
    try {
      const response = await login({ email: config.demoAdminEmail, password: config.demoAdminPass }).unwrap()
      if (response?.success) {
        navigate("/")
        toast.success(response?.message)
      }
    } catch (error: any) {
      toast.error(error?.data.message)

    }
  }

 

  return (
    <div className={cn("flex flex-col gap-6")} >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 p-5")}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="grid gap-6">
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
                  <div className="grid gap-3">
                    <div className="flex items-center">

                    </div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between">Password
                            <p onClick={() => setOpenForgetPassDialog(true)} className="ml-auto text-sm font-normal underline-offset-4 hover:underline">
                              Forgot your password?
                            </p>
                          </FormLabel>

                          <FormControl>
                            <Input type="password" placeholder="password" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {
                    isLoading ? <LoadingButton text="Login" /> : <Button type="submit" className="w-full">
                      Login
                    </Button>
                  }


                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>

            </Form>
            <div className="px-5 space-y-2 mb-5">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full " onClick={handleGoogle} disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Login with GitHub
              </Button>
              <Button disabled={isLoading} variant="outline" className="w-full" onClick={loginWithDemoDoctor}>
                Demo Doctor
              </Button>
              <Button disabled={isLoading} variant="outline" className="w-full" onClick={loginWithDemoAdmin}>
                Demo Admin
              </Button>
            </div>
          </div>
          <div className="bg-primary/5 relative hidden md:block">
            <div className="mt-5 ml-5">
              <Logo />
            </div>
            <img
              src={doctorImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      <ForgetPassPage open={openForgetPassDialog} setOpen={setOpenForgetPassDialog} />
    </div>
  )
}
