"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Signup from "@/public/signup.jpg";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import { toast } from "sonner";
import Link from "next/link";

const schema = z
  .object({
    role: z.enum(["teacher", "student"]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    parentEmail: z.string().email("Invalid parent email address"),
    phone: z.string().min(10, "Invalid telephone number"),
    country: z.enum(["Barbados", "Jamaica", "Guyana", "Trinidad"]),
    school: z.string().min(2, "School name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

const SignupForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "student",
      country: "Barbados",
      terms: false,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch("/api/auth/signup", {
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
      toast("Registered successfully", {
        className: "text-green-500",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-2 sm:px-4 lg:px-0">
      <div className="hidden lg:flex">
        <Image
          src={Signup}
          alt="Robotic handshake"
          className="w-full object-cover"
        />
      </div>
      <div className="bg-[#F7FCFF] dark:bg-transparent py-2 flex items-center">
        <form
          className="max-w-sm w-full mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl sm:text-2xl text-gray-600 mb-4">
            Teachers & Students - register now to get started!
          </h1>

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full mt-4">
                  <SelectValue placeholder="I am a..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                className="mt-4"
                placeholder="Your name"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                className="mt-4"
                placeholder="Username"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                className="mt-4"
                placeholder="E-mail address"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <Controller
            name="parentEmail"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                className="mt-4"
                placeholder="Parent Email"
              />
            )}
          />
          {errors.parentEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parentEmail.message}
            </p>
          )}

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                className="mt-4"
                placeholder="Telephone"
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full mt-4">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="Barbados">Barbados</SelectItem>
                    <SelectItem value="Jamaica">Jamaica</SelectItem>
                    <SelectItem value="Guyana">Guyana</SelectItem>
                    <SelectItem value="Trinidad">Trinidad & Tobago</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}

          <Controller
            name="school"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                className="mt-4"
                placeholder="Search for School"
              />
            )}
          />
          {errors.school && (
            <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                className="mt-4"
                placeholder="Password"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                className="mt-4"
                placeholder="Confirm Password"
              />
            )}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password_confirmation.message}
            </p>
          )}

          <div className="flex items-center mt-4 sm:mt-8 space-x-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 leading-6"
            >
              I agree to the terms and conditions.{" "}
              <Link href="/terms" className="text-[#0072C6]">
                Read here
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="text-gray-100 mt-2 sm:mt-4 bg-[#0072C6] w-full grid place-content-center py-2 sm:py-2.5 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="flex justify-center text-sm mt-1 sm:mt-2.5">
            <Link href="/signin" className="text-[#0072C6] text-sm">
              Already have an account?{" "}
            </Link>
            <Link href="/signin" className="text-[#0072C6] text-sm">
              Sign in
            </Link>
          </div>

          <div className="mt-5 flex justify-center">
            <Link href="/" className="text-[#0072C6] text-sm">
              Back to homepage{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
