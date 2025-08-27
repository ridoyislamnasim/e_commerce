
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { loginUser } from "./action";
import Image from "next/image";
import logo from "@/assets/logo/Logo.png";
import { Eye, EyeOff } from "lucide-react";
import { saveAuthData } from "@/utils/auth";
import Link from "next/link";
import { SignInUser } from "@/services/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const loggedIn = await SignInUser(values);
      console.log("User login response:", loggedIn);
      console.log("User login response:", loggedIn.status);
      const { accessToken, refreshToken, user } = loggedIn.data;
      console.log("User login response:", loggedIn.data.user);
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("user:", user);
      if (loggedIn.status === 'success') {
        saveAuthData({ accessToken, refreshToken, user });
        toast({
          title: "Logged in Successfully!",
          variant: "default",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Authentication Failed!",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative">
      {/* Background watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="90%" height="90%" viewBox="0 0 1200 800" fill="none">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="600"
            fill="#f5f5f5"
            fontWeight="bold"
            opacity="0.07"
          >
            M
          </text>
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image src={logo} alt="MSLV Fashion" width={120} height={40} />
        </div>
        <div className="bg-white rounded-xl shadow-lg px-8 py-10 flex flex-col items-center">
          <h2 className="text-2xl font-medium mb-6 text-center">Admin Panel</h2>
          <Form {...form}>
            <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email / Mobile No</FormLabel>
                    <FormControl>
                      <Input placeholder="Email / Mobile No" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs">
                      {form.formState.errors.email?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2 text-gray-500"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs">
                      {form.formState.errors.password?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="w-full text-left">
                <Link href="#" className="text-red-400 text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button loading={loading} type="submit" className="w-full mt-2 rounded-full text-lg font-medium shadow transition hover:bg-gray-900">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}