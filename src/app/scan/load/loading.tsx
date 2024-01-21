"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import loadicon from "../../../../public/loadingAnimationMem.svg";
import { Progress } from "@/components/ui/progress";

const Loading = ({ fileSize }: { fileSize: number }) => {
  const percentage = Math.floor((fileSize / 90) * 100);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the new progress value by adding 5 to the current progress
      const newProgress = progress >= 85 ? progress : progress + 5;

      // Check if the new progress exceeds 100%, in which case, stop the interval
      if (newProgress >= 100) {
        clearInterval(intervalId);
      } else {
        setProgress(newProgress);
      }
    }, 1000); // Interval of 2 seconds (2000 milliseconds)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [progress]);

  return (
    <div className="flex gap-10 p-8 items-center h-full justify-center relative bg-jas-grey_light rounded-[2rem]">
      <div className="flex justify-center flex-1 flex-col items-center gap-8 relative w-full h-full">
        <Image alt="" src={loadicon} />
        <h1 className="text-4xl font-extrabold w-full text-center">
          Loading your scan data...
        </h1>

        <Progress
          value={progress}
          className=" bg-[#D3D8DC] w-1/2 h-4"
          color="blue"
          // style={{ color: "rgb(0 148 255)", width: "500px", height: "30px" }}
        />
        {/* <p className="text-cl font-bold text-jas-grey">
          {percentage}% uploaded | {fileSize}/90mb
        </p> */}
      </div>
    </div>
  );
};

export default Loading;
