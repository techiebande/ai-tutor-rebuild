"use client";
import React from "react";
import PageContainer from "./PageContainer";
import { ArrowUp } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { data } = useUser();

  const user = data?.data;

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "GET" });

    router.push("/signin");
  };

  return (
    <div className="bg-[#0C83DA] dark:bg-[#000000] py-10 text-gray-100">
      <PageContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 lg:grid-cols-12 lg:gap-8">
          <div className="md:col-span-5 lg:max-w-md">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              WizdomCRM
            </h1>
            <p>
              Copyright @ 2024 All Rights Reserved by WizdomCRM Caribbean Ltd.
              Our platform mission is to provide modern, relevant, quality,
              equitable education for all.
            </p>
          </div>
          <div className="md:col-span-3">
            <h1 className="text-xl sm:text-2xl  font-bold mb-2">Quick links</h1>
            {!user ? (
              <>
                <Link href="/signup">
                  <p> Sign Up</p>
                </Link>
                <Link href="signin">
                  <p> Sign in</p>
                </Link>
              </>
            ) : (
              <Button
                className="px-0 hover:bg-transparent"
                variant="ghost"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            )}
          </div>
          <div className="md:col-span-3">
            <h1 className="text-xl sm:text-2xl  font-bold mb-2">Legal</h1>
            <a href="#">
              <p> Privacy Policy</p>
            </a>
            <a href="#">
              <p>Terms and Conditions</p>
            </a>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <button
              className="h-fit border-4 p-1.5 text-xl rounded-full border-gray-100"
              onClick={scrollToTop}
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default Footer;
