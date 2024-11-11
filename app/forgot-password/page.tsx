"use client";
import React from "react";
import Image from "next/image";
import SignIn from "@/public/signIn.jpg";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function page() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-2 sm:px-4 lg:px-0">
        <div className="hidden lg:flex">
          <Image
            src={SignIn}
            alt="Robotic handshake"
            className="w-full object-cover"
          />
        </div>
        <div className="bg-[#F7FCFF] py-10 dark:bg-transparent flex items-center">
          <form className="max-w-sm mx-auto">
            <h1 className="text-xl sm:text-2xl text-gray-600">
              Reset password
            </h1>
            <p className="text-sm">
              One verification code will be sent to the registered email address
            </p>

            <Input type="email" className="mt-4" placeholder="E-mail address" />

            <div className="flex items-center mt-4 space-x-2"></div>
            <button className="text-gray-100 mt-2 sm:mt-4 bg-[#0072C6] w-full grid  place-content-center py-2 sm:py-2.5 rounded-lg">
              Send recovery code{" "}
            </button>
            <div className="flex justify-center text-sm mt-1 sm:mt-2.5">
              <Link href="/signin" className="text-[#0072C6] text-sm">
                Back to login{" "}
              </Link>
            </div>

            <div className="mt-5 flex justify-center ">
              <Link href="/" className="text-[#0072C6] text-sm">
                Back to homepage{" "}
              </Link>
            </div>
            {/* <SignupFormDemo /> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
