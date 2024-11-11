"use client";

import Image from "next/image";
import HeroImage from "@/public/hero-image.png";
import SubjectOne from "@/public/subjects/one.svg";
import SubjectTwo from "@/public/subjects/two.svg";
import SubjectThree from "@/public/subjects/three.svg";
import SubjectFour from "@/public/subjects/four.svg";
import SubjectFive from "@/public/subjects/five.svg";
import SubjectSix from "@/public/subjects/six.svg";
import SubjectSeven from "@/public/subjects/seven.svg";
import SubjectEight from "@/public/subjects/eight.svg";
import SubjectNine from "@/public/subjects/nine.svg";
import SubjectTen from "@/public/subjects/ten.svg";
import SubjectEleven from "@/public/subjects/element.svg";
import SubjectTwelve from "@/public/subjects/twelve.svg";
import SubjectThirteen from "@/public/subjects/Thirteen.svg";
import SubjectFourteen from "@/public/subjects/fourteen.svg";
import Tutor from "@/components/Tutor";
import TrinidadAndTobago from "@/public/Trinidad_and_Tobago.png";
import Guyana from "@/public/Guyana.png";
import Barbados from "@/public/Barbados.png";
import Jamaica from "@/public/Jamaica.png";
import PageContainer from "./PageContainer";
import { useTutors } from "@/hooks/useTutors";
export interface TutorProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  expert: string;
  display_avatar: boolean;
  created_at: string;
}

export default function HomepageContent() {
  const { data, isLoading, isError } = useTutors();

  return (
    <section className=" overflow-x-hidden ">
      <div
        className="max-w-full min-h-[91vh] flex items-center "
        style={{
          backgroundImage: `url("/hero-bg-image.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <PageContainer>
          <section>
            <div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 items-center">
                <div className="mt-2 sm:mt-4">
                  <h1 className="text-gray-100 text-center md:text-start text-2xl sm:text-5xl  font-bold">
                    8 Animated A.I Tutors
                  </h1>
                  <p className="my-2 text-center md:text-start sm:my-4 text-gray-100 sm:text-xl max-w-3xl mx-auto">
                    Hey there, young learners! Get ready to jump into the cool
                    world of learning with our super-smart AI Tutors! 🤖✨
                    Imagine a video game that teaches you English, Math,
                    Renewable Energy, Spanish, and even how to be a spelling
                    superstar —all in your own special way!
                  </p>
                  <div className="flex justify-center">
                    <button className="sm:text-xl mx-auto md:mx-0 px-2 py-2 sm:px-6 inline w-fit mt-2 sm:mt-4 sm:py-3 bg-[#B104D1] hover:shadow-2xl hover:shadow-[#824f8b] font-bold rounded text-gray-100">
                      The future of online learning{" "}
                    </button>
                  </div>
                </div>
                <div className="">
                  <Image
                    src={HeroImage}
                    alt="Hero image"
                    className="object-cover max-w-full mx-auto h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </PageContainer>
      </div>
      <section className="max-w-4xl mx-auto my-5 sm:my-10 ">
        <div className="mt-5 sm:mb-10">
          <h1 className="dark:text-gray-100 text-xl sm:text-4xl font-bold mx-auto text-blue-600 text-center">
            Approved By Regional Ministry of Education{" "}
          </h1>
        </div>

        <div className="h-full rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="">
              <h1 className="text-2xl text-gray-600 font-semibold text-center">
                Trinidad & Tobago
              </h1>
              <Image
                src={TrinidadAndTobago}
                alt="Trinidad & Tobago logo"
                className="max-w-56 mx-auto mt-5"
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
        </div>
      </section>
      <section className="w-full">
        <div className="w-full px-2 sm:px-5 xl:px-20">
          <div className="w-full py-3">
            <iframe
              className="h-[150px] sm:h-[300px] md:h-[489px] w-full"
              src="https://www.youtube.com/embed/MPNrsIw_U2g"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>{" "}
        </div>{" "}
      </section>

      <PageContainer>
        {/* Speak with our AI Tutors */}
        <div className="mt-5 sm:mt-10">
          <h1 className="dark:text-gray-100 text-xl sm:text-4xl font-bold mx-auto text-blue-600 text-center">
            Speak with our AI Tutors{" "}
          </h1>
          <p className="dark:text-gray-100 my-2 sm:my-4 text-gray-700  text-center">
            Welcome to personalized learning at the palm of your hands. 8
            cartoon animals, trained by AI to help teachers and students with
            their subjects.
          </p>
        </div>
        <div>
          <div className="grid gap-4 md:gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {isLoading
              ? "Fetching tutors..."
              : isError
              ? "Error fetching tutors"
              : data.data.map((tutor: TutorProps) => {
                  return <Tutor tutor={tutor} key={tutor.id} />;
                })}
          </div>

          <div className="mt-5 sm:mt-10">
            <h1 className="dark:text-gray-100 text-xl sm:text-3xl font-bold mx-auto text-gray-800 text-center">
              AI Tutor by subjects for Primary & Secondary school students in
              the Caribbean.
            </h1>
          </div>
          <div className="justify-between sm:mb-10 gap-2 pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 mb-5 ">
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectOne}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      English Teacher{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectTwo}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Mathematics
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectThree}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Geography{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectFour}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Animation{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectFive}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Physics{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectSix}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Guidance Counsellor{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectSeven}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Principles of Accounts{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectEight}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Renewable Energy & Environmental Friendly{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectNine}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Sustainability{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectTen}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Values Character and Citizenship Education.{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectEleven}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Principles of Business & Management of Business{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectTwelve}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm dark:text-gray-400 font-semibold text-center mt-2">
                      Reading & Writing{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectThirteen}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm text-gray-600 dark:text-gray-400 font-semibold text-center mt-2">
                      Science & Conservation{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href="#" className="">
                <div className=" bg-white dark:bg-[#2D2D2D] flex flex-col px-1 sm:px-2 py-7 w-full h-full  rounded  mx-auto shadow-lg border">
                  <Image
                    width={65}
                    height={65}
                    src={SubjectFourteen}
                    alt="Hero image"
                    className="mx-auto dark:invert"
                  />
                  <div>
                    <h6 className="text-sm text-gray-600 dark:text-gray-400 font-semibold text-center mt-2">
                      Sports{" "}
                    </h6>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
