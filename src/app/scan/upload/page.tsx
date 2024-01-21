"use client";

import React, { MouseEventHandler, MouseEvent, useCallback, useState } from "react";
import IconizedBadge from "@/components/IconizedBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FileUp, HeartPulse, Stethoscope } from "lucide-react";
import { useDropzone } from "react-dropzone";

const Page = () => {
  const [file, setFile] = useState<File[]>([]);

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
    // post to the fastAPI backend where the mammogram model lives
    if (!process.env.NEXT_PUBLIC_MAMMOGRAM_MODEL_ENDPOINT) {
      console.error("Missing mammogram model endpoint");
      return;
    }

    const MammogramModelEndpoint = process.env.NEXT_PUBLIC_MAMMOGRAM_MODEL_ENDPOINT + "/detect";
    // convert image to base64 to compress
    const fileUpload = file[0];
    // create a reader to convert to base64 and hit the fastapi backend
    let reader = new FileReader();

    reader.onloadend = async (e) => {

      const base64String = (reader.result as string)
        .replace('data:', '')
        .replace(/^.+,/, '');

      let formData = new FormData();
      formData.append('image', base64String);

      const res = await fetch(MammogramModelEndpoint, {
        method: 'POST',
        body: formData
      });

      console.log(await res.json())
    };

    reader.readAsDataURL(fileUpload);
  }

  return (
    <div className="flex flex-col gap-8 items-center h-full justify-center relative bg-jas-grey_light rounded-[2rem]">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-extrabold">Upload your screening.</h1>
        <h1 className="text-5xl font-extrabold">Receive immediate feedback</h1>
        <h4 className="text-2xl font-bold text-jas-grey_dark">works with</h4>
        <div className="flex gap-4 justify-center">
          <IconizedBadge icon={<Stethoscope />} title="breast cancer" />
          <IconizedBadge icon={<HeartPulse />} title="heart health" />
        </div>
      </div>

      <Card className="flex bottom-4 outline-dashed outline-4 outline-jas-grey">
        <div
          className={cn(
            "flex flex-col py-8 w-[40rem] justify-center items-center px-32 gap-6",
            isDragActive && "brightness-90 bg-jas-grey_light",
          )}
          {...getRootProps()}
        >
          {file.length > 0 ? (
            <>
              <div className="h-[230px] flex-center text-2xl">
                <span className="font-bold mr-1">{file[0].name}</span> -{" "}
                {file[0].size} bytes
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

              <h1 className="font-bold text-3xl text-jas-grey_dark text-center">
                Select a file from a computer
              </h1>
            </>
          )}
        </div>
      </Card>

      {file.length > 0 && (
        <Button className="mx-auto bg-green-500 hover:bg-green-500/80" onClick={handleUpload}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default Page;
