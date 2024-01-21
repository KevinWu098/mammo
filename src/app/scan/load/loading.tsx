"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

import loadicon from "../../../../public/loadingAnimationMem.svg";

const Loading = ({ fileSize }: { fileSize: number }) => {
  const percentage = Math.floor((fileSize / 90) * 100);
  const [progress, setProgress] = useState(30);
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
        <p className="text-cl font-bold text-jas-grey">
          {percentage}% uploaded | {fileSize}/90mb
        </p>
      </div>
    </div>
  );
};

export default Loading;
