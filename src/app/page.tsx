"use client";

//* landing page :P
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { motion } from "framer-motion";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2, Square } from "lucide-react";

export default function Home() {
  //   const { getUser } = getKindeServerSession();
  //   const user = await getUser();

  // const dbUser = user
  //     ? await db.user.findFirst({
  //           where: {
  //               id: user?.id,
  //           },
  //       })
  //     : null;

  return (
    <main className="w-full">
      {/* nav bar */}
      <div
        style={{ zIndex: "1000", padding: "0px 22px" }}
        className="nav-bar flex flex-row items-center  align-center  w-full-screen p-1"
      >
        <div>
          <Image
            src={"/mammothLogo.png"}
            width={180}
            alt="mammoth logo"
            height={50}
            className=""
          />
        </div>
        <div className="flex flex-row gap-12">
          <Link
            href={"/scan/upload"}
            className=" no-underline  text-jas-grey_dark text-lg font-semibold hover:text-jas-grey"
            style={{ textDecoration: "none" }}
          >
            Features
          </Link>
          <Link
            href={"/dashboard"}
            className="no-underline text-jas-grey_dark text-lg font-semibold hover:text-jas-grey"
          >
            Pricing
          </Link>
          <Link
            href={"/dashboard"}
            className="no-underline text-jas-grey_dark text-lg font-semibold hover:text-jas-grey"
          >
            About us
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button className="bg-jas-grey_dark rounded-xl font-bold text-lg  no-underline ">
              Log in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-jas-blue rounded-xl no-underline font-bold text-lg">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
      {/* main page */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {" "}
        <div
          className="gap-8 flex flex-col items-center justify-center w-full"
          style={{ height: "80vh" }}
        >
          <Image
            src={"/landingMam.svg"}
            alt="mammoth logo"
            width={120}
            height={100}
            className="w-full "
            style={{ position: "absolute", zIndex: "-1", marginTop: "80vh" }}
          />
          <div className="flex flex-col gap-8">
            <h1
              className=" font-extrabold text-center"
              style={{
                fontSize: "3.5em",
                lineHeight: "1.1",
                zIndex: "1000",
                padding: "0 10vw",
                width: "1000px",
              }}
            >
              Get <span style={{ color: "#0094FF" }}>✓</span>affordable,{" "}
              <span style={{ color: "#0094FF" }}>→</span>quick, actionable
              cancer insights. completely free.
            </h1>
            <div className="flex-center flex flex-col g-22">
              <Link href={"/scan/upload"}>
                <Button
                  style={{
                    zIndex: "1000",
                    padding: "30px",
                    borderRadius: "22px",
                  }}
                  className="bg-jas-blue font-bold text-xl no-underline "
                >
                  Scan your file now
                </Button>
              </Link>
              <Button
                style={{ zIndex: "1000" }}
                className="text-jas-grey_dark bg-transparent bg-none rounded-xl font-bold text-xl  p-5 no-underline hover:bg-transparent text-jas-grey"
              >
                View demo
              </Button>
            </div>
          </div>
        </div>
        {/* features */}
        <div className="landing-contain">
          <div className="tag font-semibold bg-jas-grey_light p-2 rounded-2xl flex items-center w-fit">
            Platform
          </div>
          <h1
            className=" text-5xl font-extrabold text-center z-[1000]"
            style={{ zIndex: 1000, maxWidth: "700px" }}
          >
            Everything you will ever need in a <span>single place</span>
          </h1>
          <div className="features-contain">
            <div className="feature-item">
              <div
                className="tag-mini text-md font-semibold p-2 rounded-lg"
                style={{
                  color: "#14B91B",
                  width: "fit-content",
                  backgroundColor: "#E2FDE3",
                }}
              >
                live feedback
              </div>
              <h3 className="font-extrabold text-3xl">
                Computer Vision Screening
              </h3>
              <p
                className="font-semibold text-2xl"
                style={{ color: "#6E6E6E" }}
              >
                real-time, visual representation of problem areas.
              </p>
              <Link href="/scan/upload">
                <Button
                  style={{ padding: "0" }}
                  className="text-jas-grey bg-transparent bg-none rounded-xl font-bold text-2xl no-underline hover:bg-transparent text-jas-grey"
                >
                  Try CV now →
                </Button>
              </Link>
            </div>
            <div className="feature-item">
              <div
                className="tag-mini text-md font-semibold p-2 rounded-lg"
                style={{
                  color: "#FF3357",
                  width: "fit-content",
                  backgroundColor: "#FFDCE2",
                }}
              >
                resources
              </div>
              <h3 className="font-extrabold text-3xl">
                AI-driven resources and tools
              </h3>
              <p
                className="font-semibold text-2xl"
                style={{ color: "#6E6E6E" }}
              >
                receive personalized, action-orientated resources.
              </p>
              <Link href="/chat">
                <Button
                  style={{ padding: "0" }}
                  className="text-jas-grey bg-transparent bg-none rounded-xl font-bold text-2xl no-underline hover:bg-transparent text-jas-grey"
                >
                  Try AI now →
                </Button>
              </Link>
            </div>
            <div className="feature-item">
              <div
                className="tag-mini text-md font-semibold p-2 rounded-lg"
                style={{
                  color: "#0094FF",
                  width: "fit-content",
                  backgroundColor: "#C3E6FF",
                }}
              >
                tracking
              </div>
              <h3 className="font-extrabold text-3xl">
                Free, comprehensive reports
              </h3>
              <p
                className="font-semibold text-2xl"
                style={{ color: "#6E6E6E" }}
              >
                receive full reports on your health to track over time.{" "}
              </p>
              <Link href="/scan/upload">
                <Button
                  style={{ padding: "0" }}
                  className="text-jas-grey bg-transparent bg-none rounded-xl font-bold text-2xl no-underline hover:bg-transparent text-jas-grey"
                >
                  Try CV now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* ai thing */}
        <div className="ai-contain">
          <div
            className="tag font-semibold bg-[#3A3D46] p-2 rounded-2xl flex items-center w-fit"
            style={{ color: "#C8C8C8" }}
          >
            Generative AI
          </div>
          <h1
            className=" text-5xl font-extrabold text-center z-[1000]"
            style={{ zIndex: 1000, maxWidth: "700px" }}
          >
            Don’t just get information AI helps you <span>take action.</span>
          </h1>
          <Image
            src={"/genai.svg"}
            alt="mammoth logo"
            width={180}
            height={140}
            className="w-full"
            style={{ maxWidth: "1000px" }}
          />
        </div>
        {/* cta */}
        <div className="cta-contain">
          <Image
            src={"/backgroundMem.svg"}
            alt="mammoth logo"
            width={100}
            height={100}
            className="w-full "
            style={{ position: "absolute", zIndex: "-1", maxWidth: "100vw" }}
          />
          <div className="tag font-semibold bg-jas-grey_light p-2 rounded-2xl flex items-center w-fit">
            Join now
          </div>
          <h1
            className=" text-5xl font-extrabold text-center z-[1000]"
            style={{ zIndex: 1000, maxWidth: "700px" }}
          >
            Improve your health now in a <span>single click.</span>
          </h1>
          <Link href={"/scan/upload"}>
            <Button
              style={{ zIndex: "1000", padding: "30px", borderRadius: "22px" }}
              className="bg-jas-blue font-bold text-xl no-underline "
            >
              Scan your file now
            </Button>
          </Link>
        </div>
        {/* footer */}
        <div className="flex center items-center align-center justify-center h-15vh relative bg-[#fff]">
          <div className="hr border border-gray-300">
            <hr />{" "}
          </div>
          <p
            className="font-semibold flex flex-center justify-center items-center text-center p-5"
            style={{ width: "100vw", borderTop: "4px solid #D8DBE3" }}
          >
            made with 💖 & lots of ☕️ @ UCR
          </p>
        </div>
      </motion.div>
    </main>
  );
}
