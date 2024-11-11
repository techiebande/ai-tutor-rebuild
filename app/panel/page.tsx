import React from "react";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import { PiCopySimpleThin } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineListAlt } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import Img from "@/public/image.png";
import Image from "next/image";
import TrinidadAndTobago from "@/public/Trinidad_and_Tobago.png";
import Guyana from "@/public/Guyana.png";
import Barbados from "@/public/Barbados.png";
import Jamaica from "@/public/Jamaica.png";
import Link from "next/link";
function page() {
  return (
    <div className="bg-[#F7FCFF]">
      <Navbar />
      <div className="bg-[#004E89] py-2 md:py-4 mb-5 sm:mb-10">
        <PageContainer>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-100 ">
              Welcome Queen Student
            </h1>
          </div>
        </PageContainer>
      </div>
      <section>
        <PageContainer>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-8 mb-32">
              <div className=" rounded-lg md:col-span-3 text-gray-400">
                <div className="w-full border divide-y rounded-md bg-white ">
                  <div>
                    <Link href="#">
                      <div className="w-full flex items-center p-4 lg:py-4 lg:px-5 border-s-4 rounded-tl-md border-s-blue-500 group">
                        <PiCopySimpleThin className="group-hover:text-blue-600" />
                        <h3 className="font-semibold text-gray-500 ps-2 group-hover:text-blue-500">
                          My AI Room
                        </h3>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="#">
                      <div className="w-full flex items-center p-4 lg:py-4 lg:px-5 group">
                        <IoPersonCircleOutline className="group-hover:text-blue-600" />
                        <h3 className="font-semibold text-gray-500 ps-2 group-hover:text-blue-500">
                          My account
                        </h3>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="#">
                      <div className="w-full flex items-center p-4 lg:py-4 lg:px-5 group">
                        <MdOutlineListAlt className="group-hover:text-blue-600" />
                        <h3 className="font-semibold text-gray-500 ps-2 group-hover:text-blue-500">
                          My purchases
                        </h3>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="#">
                      <div className="w-full flex items-center p-4 lg:py-4 lg:px-5 group">
                        <TbLogout2 className="group-hover:text-blue-600" />
                        <h3 className="font-semibold text-gray-500 ps-2 group-hover:text-blue-500">
                          Logout{" "}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="h-full rounded-lg md:col-span-9">
                <div className="grid grid-cols-4">
                  <div className="">
                    <h1 className="text-2xl text-gray-600 font-semibold text-center">
                      Trinidad & Tobago
                    </h1>
                    <Image
                      src={TrinidadAndTobago}
                      alt="Trinidad & Tobago logo"
                      className="max-w-32 mx-auto mt-5"
                    />
                  </div>
                  <div className="">
                    <h1 className="text-2xl text-gray-600 font-semibold text-center">
                      Guyana
                    </h1>
                    <Image
                      src={Guyana}
                      alt="Guyana logo"
                      className="max-w-32 mx-auto mt-5"
                    />
                  </div>
                  <div className="">
                    <h1 className="text-2xl text-gray-600 font-semibold text-center">
                      Barbados{" "}
                    </h1>
                    <Image
                      src={Barbados}
                      alt="Barbados logo"
                      className="max-w-32 mx-auto mt-5"
                    />
                  </div>
                  <div className="">
                    <h1 className="text-2xl text-gray-600 font-semibold text-center">
                      Jamaica{" "}
                    </h1>
                    <Image
                      src={Jamaica}
                      alt="Jamaica logo"
                      className="max-w-32 mx-auto mt-5"
                    />
                  </div>
                </div>
                <div className="rounded-full w-16 h-16 bg-slate-600"></div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

export default page;
