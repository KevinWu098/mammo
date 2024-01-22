"use client";

import React, { useEffect, useState } from "react";
import ActionCard from "./ActionCard";
import IconizedBadge from "./IconizedBadge";
import { Card } from "./ui/card";
import { DietTag, LocationTag } from "./ui/tag";
import { AlertTriangle, ScrollText } from "lucide-react";

type Coordinate = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
};

interface AnalysisProps {
  segmentedImage: string;
  coordinates: Coordinate[];
}

const Analysis = ({ segmentedImage, coordinates }: AnalysisProps) => {
  const segmentedImageRef = React.useRef<HTMLImageElement>(null);

  const [key, setKey] = useState(1);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="flex  gap-8 p-8 items-center h-full justify-center relative bg-jas-grey_light  rounded-[2rem]">
      <div className="flex flex-1 flex-col items-center gap-4 w-full h-full relative">
        <h1 className="text-4xl font-extrabold w-full r">Your Scan</h1>
        <Card className="flex w-full h-full rounded-3xl relative">
          <>
            {segmentedImage && (
              <img
                src={segmentedImage}
                alt="test"
                className="rounded-3xl p-1 size-[30rem]"
                key={key}
                ref={segmentedImageRef}
              />
            )}

            {segmentedImage &&
              segmentedImageRef?.current &&
              coordinates.map((coordinate) => {
                return (
                  <div
                    key={`${coordinate.x}, ${coordinate.y}`}
                    style={{
                      width:
                        (coordinate.width / 1024) *
                        segmentedImageRef.current!.width,
                      height:
                        (coordinate.height / 1024) *
                        segmentedImageRef.current!.height,
                      position: "absolute",
                      top:
                        (coordinate.y / 1024) *
                          segmentedImageRef.current!.height -
                        coordinate.height / 4,
                      left:
                        (coordinate.x / 1024) *
                          segmentedImageRef.current!.width -
                        coordinate.width / 4,

                      border: "2px solid red",
                    }}
                  />
                );
              })}
          </>
        </Card>

        <Card className=" flex flex-col p-8 rounded-3xl w-full justify-evenly gap-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-red-600 rounded-xl">
              <AlertTriangle fill="white" color="red" size={32} />
            </div>
            <h1 className="text-2xl font-bold">Note</h1>
          </div>
          <h2 className="text-xl font-bold text-jas-grey">
            This is not a professional medical report; please consult a
            professional.
          </h2>
        </Card>
      </div>

      <div className="flex flex-1 flex-col gap-4 items-center h-full">
        <Card className="flex flex-col p-8 rounded-3xl gap-4 ">
          <div className="w-max-[10rem]">
            <IconizedBadge icon={<ScrollText />} title="your result" />
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="text-5xl font-extrabold">Severe</h1>
            <h2 className="p-2 text-3xl font-bold bg-jas-red rounded-xl text-white">
              88
            </h2>
          </div>

          <h3 className="text-xl font-bold text-jas-grey">
            Your results indicates that your health is at risk. Please consult a
            professional.
          </h3>
        </Card>

        <h1 className="text-4xl font-extrabold w-full">Take Action</h1>

        <div className="flex flex-col gap-2 w-full">
          <ActionCard
            props={{
              title: "Visit a local doctor",
              Tag: <LocationTag />,
              link: "https://google.com",
              special: "location",
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <ActionCard
            props={{
              title: "Eat more fiber",
              Tag: <DietTag />,
              link: "https://google.com",
              special: "diet",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
