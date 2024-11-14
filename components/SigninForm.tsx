"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SignIn from "@/public/signIn.jpg";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (resData.error) {
      toast(resData.error, {
        className: "text-red-500",
      });
    } else {
      toast("Sign in successful", {
        className: "text-green-500",
      });
      router.push("/");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-2 sm:px-4 lg:px-0">
      <div className="hidden lg:flex">
        <Image
          src={SignIn}
          alt="Robotic handshake"
          className="w-full object-cover"
        />
      </div>
      <div className="bg-[#F7FCFF] dark:bg-transparent flex items-center">
        <form
          className="max-w-sm w-full mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl sm:text-2xl text-gray-600">
            Welcome back students!
          </h1>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                className="mt-4 w-full"
                placeholder="E-mail address"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                className="mt-4 w-full"
                placeholder="Password"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <div className="flex items-center space-x-2 w-full">
            <Link
              href="/forgot-password"
              className="text-[#0072C6] text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 my-2 w-full"
            >
              I Forgot my password
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="text-gray-100 bg-[#0072C6] w-full grid place-content-center py-2 sm:py-2.5 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          <div className="flex justify-center text-sm mt-1 sm:mt-2.5">
            <Link href="/signup" className="text-[#0072C6] text-sm">
              Don&apos;t have an account? Sign up
            </Link>
          </div>

          <div className="mt-5 flex justify-center">
            <Link href="/" className="text-[#0072C6] text-sm">
              Back to homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
