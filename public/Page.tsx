'use client'
//* landing page :P
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2, Square } from "lucide-react";
import { motion } from "framer-motion"

export default async function Home() {
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
    <main className="wrapper w-full">
      {/* nav bar */}
      <div style={{zIndex:'1000'}} className="flex flex-row items-center justify-center align-center justify-between w-full-screen p-1">
        <div>
          <Image
            src={"/mammothLogoLong.svg"}
            width={150}
            alt="mammoth logo"
            height={40}
            className=""
          />
        </div>
        <div className="flex flex-row gap-4">
          <Link
            href={"https://github.com/KevinWu098/kTemp"}
            target="_blank"
            referrerPolicy="no-referrer"
            className=" no-underline  text-jas-grey_dark text-lg font-semibold hover:text-jas-grey"
            style={{ textDecoration: "none" }}
          >
            Features
          </Link>
          <Link
            href={"https://github.com/KevinWu098/kTemp"}
            target="_blank"
            referrerPolicy="no-referrer"
            className="no-underline text-jas-grey_dark text-lg font-semibold hover:text-jas-grey"
          >
            About us
          </Link>
        </div>
        <div className="flex gap-4">
          <Button className="bg-jas-grey_dark rounded-xl font-bold text-lg  no-underline ">
            Log in
          </Button>
          <Button className="bg-jas-blue rounded-xl no-underline font-bold text-lg">
            Sign up
          </Button>
        </div>
      </div>
      {/* main page */}
     
        <motion.div
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 1, ease: "easeOut"}}
> <div className="gap-8 flex flex-col items-center justify-center w-full" style={{ height: '80vh'}}>
<Image
            src={"/landingMam.svg"}
        
            alt="mammoth logo"
          width={120}
          height={100}
          className="w-full"
            style={{position:'absolute', zIndex:'1', marginTop:'80vh'}}
          />
          <div className="flex flex-col gap-8">
             <h1 className="text-5xl font-extrabold text-center" style={{zIndex:'1000', padding: '0 10vw'}}>
          Get <span style={{color:"#0094FF"}}>✓</span>affordable, <span style={{color:"#0094FF"}}>→</span>quick, actionable cancer insights. completely free.
        </h1>
        <div className="flex-center flex-col g-18">
            <Button style={{zIndex:'1000'}} className="bg-jas-blue rounded-lg font-bold text-lg  p-6 no-underline ">
            Scan your file now
          </Button>
        <Button style={{zIndex:'1000'}} className="text-jas-grey_dark bg-transparent bg-none rounded-xl font-bold text-lg  p-5 no-underline hover:bg-transparent text-jas-grey">
            View demo
          </Button>
        </div>
          </div>
       
         </div>
{/* features */}
         <div className="landing-contain">
            <div className="tag font-semibold bg-jas-grey_dark p-2 rounded-2xl flex items-center w-fit">Generative AI</div>
            <h1 className="landing-contain text-5xl font-extrabold text-center">Everything you will ever need in a <span>single place</span></h1>
            <div className="features-contain">
                <div className="feature-item">
                    <div className="tag-mini text-sm font-semibold">
                        live feedback
                    </div>
                    <h3>Computer Vision screening</h3>
                </div>
            </div>
        </div>

        </motion.div>
     
      
     
    </main>
  );
}
