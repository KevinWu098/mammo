import React from "react";
import Image from "next/image";
import Loading from "../load/loading";
import ActionCard from "@/components/ActionCard";
import IconizedBadge from "@/components/IconizedBadge";
import { Card } from "@/components/ui/card";
import { LocationTag } from "@/components/ui/tag";
import { AlertTriangle, MapPin, ScrollText } from "lucide-react";

const Page = () => {
  const segmentedImage =
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

  return false ? (
    <Loading fileSize={30} />
  ) : (
    <div className="flex  gap-8 p-8 items-center h-full justify-center relative bg-jas-grey_light  rounded-[2rem]">
      <div className="flex flex-1 flex-col items-center gap-4 relative w-full h-full">
        <h1 className="text-4xl font-extrabold w-full">Your Scan</h1>
        <Card className="flex w-full h-full rounded-3xl">
          {segmentedImage ? (
            <img src={segmentedImage} alt="test" className="rounded-3xl p-1" />
          ) : null}
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
