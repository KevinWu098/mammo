"use client";

import fs from "fs";
import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import Loading from "../load/loading";
import ActionCard from "@/components/ActionCard";
import Analysis from "@/components/Analysis";
import IconizedBadge from "@/components/IconizedBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { LocationTag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import axios from "axios";
import {
  AlertTriangle,
  FileUp,
  HeartPulse,
  ScrollText,
  Stethoscope,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

const Page = () => {
  const [file, setFile] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [segmentedImage, setSegmentedImage] = useState<string>();
  const [coordinates, setCoordinates] = useState([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    maxFiles: 1,
  });

  const handleUpload: MouseEventHandler<HTMLButtonElement> = (event: any) => {
    event.preventDefault();
    setSubmitted(true);

    const fileUpload = file[0];
    let reader = new FileReader();
    reader.onloadend = async (e) => {
      const base64String = (reader.result as string)
        .replace("data:", "")
        .replace(/^.+,/, "");

      axios({
        method: "POST",
        url: "https://detect.roboflow.com/mammography-mass-detection/1",
        params: {
          api_key: "HSdTeiyFQoC21khAVkwp",
        },
        data: base64String,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(function (response) {
          console.log(response.data);
          setCoordinates(response.data.predictions);
          const url = URL.createObjectURL(fileUpload);
          setSegmentedImage(url);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    reader.readAsDataURL(fileUpload);
  };

  if (submitted || segmentedImage) {
    return submitted && !segmentedImage ? (
      <Loading fileSize={30} />
    ) : (
      <Analysis image={segmentedImage} coordinates={coordinates} />
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center h-full justify-center relative bg-jas-grey_light rounded-[2rem]">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-extrabold">Upload your screening.</h1>
        <h1 className="text-5xl font-extrabold">Receive immediate feedback</h1>
        <h4 className="text-2xl font-bold text-jas-grey_dark">works with</h4>
        <div className="flex gap-4 justify-center text-2xl">
          <IconizedBadge icon={<Stethoscope />} title="breast cancer" />
          <IconizedBadge icon={<HeartPulse />} title="heart health" />
        </div>
      </div>

      <Card className="flex bottom-4 outline-dashed outline-4 outline-jas-grey rounded-xl">
        <div
          className={cn(
            "flex flex-col py-8 w-[40rem] justify-center items-center px-32 gap-6",
            isDragActive && "brightness-90 bg-jas-grey_light",
          )}
          {...getRootProps()}
        >
          {file.length > 0 ? (
            <>
              <div className="h-[230px] flex-center text-2xl font-bold">
                {file[0].name}
              </div>
            </>
          ) : (
            <>
              <FileUp size={90} color="#8B8B8B" />

              <h1 className="font-bold text-3xl text-jas-grey_dark">
                Drag and drop a file
              </h1>

              <h5 className="font-semibold text-2xl text-jas-grey">or</h5>

              <Input
                {...getInputProps()}
                type="pdf"
                className={cn(
                  "bg-[#0094FF] text-white text-2xl font-bold items-center p-8 rounded-3xl",
                  isDragActive && "brightness-75",
                )}
              />

              <Button
                style={{ zIndex: "1000" }}
                className="bg-jas-blue rounded-lg font-bold text-lg  p-6 no-underline "
              >
                Select a file from your computer
              </Button>
            </>
          )}
        </div>
      </Card>

      {file.length > 0 && (
        <Button
          className="mx-auto bg-green-500 hover:bg-green-500/80"
          onClick={handleUpload}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default Page;
