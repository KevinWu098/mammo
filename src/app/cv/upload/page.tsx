import React from "react";
import IconizedBadge from "@/components/IconizedBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUp, HeartPulse, Stethoscope } from "lucide-react";

const Page = () => {
    return (
        <div className="flex flex-col gap-8  items-center h-full justify-center relative bg-jas-grey-light  rounded-[2rem]">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl font-extrabold">
                    Upload your screening.
                </h1>
                <h1 className="text-5xl font-extrabold">
                    Receive immediate feedback
                </h1>
                <h4 className="text-2xl font-bold text-jas-grey-dark">
                    works with
                </h4>
                <div className="flex gap-4 justify-center">
                    <IconizedBadge
                        icon={<Stethoscope />}
                        title="breast cancer"
                    />
                    <IconizedBadge icon={<HeartPulse />} title="heart health" />
                </div>
            </div>
            <Card className=" flex bottom-8 outline-dashed outline-4 outline-jas-grey">
                <div className=" flex flex-col py-8 w-[40rem] justify-center items-center px-32 gap-6">
                    <FileUp size={90} color="#8B8B8B" />
                    <h1 className="font-bold text-3xl text-jas-grey-dark">
                        Drag and drop a file
                    </h1>
                    <h5 className="font-semibold text-2xl text-jas-grey">or</h5>
                    <Button
                        type="submit"
                        className="bg-[#0094FF] text-white text-2xl font-bold items-center p-8 rounded-3xl"
                    >
                        Select a file from a computer
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Page;
