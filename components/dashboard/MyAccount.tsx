import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/useUser";
import FlyingLabelInput from "../ui/AnimatedInput";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must be less than 20 characters"),
  password: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const MyAccount = () => {
  const { data, isLoading, isError } = useUser();

  const user = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`/api/user/update`, {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      console.log("Response", await response.json());
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg flex gap-5 flex-col"
      >
        {/* Name Field */}
        <FlyingLabelInput
          label="Your name"
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Email Field (Disabled) */}
        <FlyingLabelInput
          disabled
          label="Email"
          id="email"
          type="email"
          value={user?.email || ""}
        />

        {/* Password Field */}
        <FlyingLabelInput
          label="Password"
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyAccount;
