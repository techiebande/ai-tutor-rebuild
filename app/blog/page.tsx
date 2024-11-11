import React from "react";
import PageContainer from "@/components/PageContainer";
import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/components/blog";
import { Calendar } from "lucide-react";
const page = () => {
  return (
    <div>
      <div className="bg-[#F7FCFF] dark:bg-[#181818]">
        <div className="bg-[#004E89] dark:bg-[#2B2B2B] py-2 md:py-4 mb-5 sm:mb-10">
          <PageContainer>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-100 ">
                Resource Centre
              </h1>
            </div>
          </PageContainer>
        </div>
        <PageContainer>
          <h1 className="text-2xl sm:text-3xl  text-[#0180DE] font-bold">
            Check out our blog
          </h1>
          <p className="text-lg text-slate-600 my-2 sm:my-3">
            Technology news and tips
          </p>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-10 gap-3 md:gap-6">
              {blogData.map((blogData) => (
                <div
                  key={blogData.id}
                  className="rounded-t-xl bg-white dark:bg-[#1e1d1d] shadow-lg"
                >
                  <div className="max- h-32 sm:h-44 -h-full w-full rounded-t-xl">
                    <Link href={`/blog/${blogData.id}`}>
                      <Image
                        src={blogData.image}
                        width={400}
                        height={400}
                        className="w-full max-h-fit rounded-t-xl"
                        alt="test"
                      />
                    </Link>
                  </div>
                  <div className="p-2 sm:p-4 mt-6">
                    <Link href={`/blog/${blogData.id}`}>
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-600 hover:text-[#0180DE]">
                        {blogData.title}
                      </h1>
                    </Link>
                    <p className="text-lg text-slate-600 my-2 sm:my-3 line-clamp-3">
                      {blogData.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg text-slate-600 my-2 sm:my-3 flex items-center">
                          <Calendar className="me-2" /> {blogData.date}
                        </p>{" "}
                      </div>
                      <div>
                        <button className="bg-[#0180DE] text-gray-200 hover:text-gray-100 hover:bg-[#017edeba] hover:border hover:border-[#0180DE] transform transition duration-300 ease-in-out font-semibold py-1.5 px-3 rounded-lg">
                          {" "}
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default page;
