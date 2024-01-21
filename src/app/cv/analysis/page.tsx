import React from "react";
import IconizedBadge from "@/components/IconizedBadge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollText } from "lucide-react";

const Page = () => {
    return (
        <div className="flex flex-col gap-8 p-4 items-center h-full justify-center relative bg-jas-grey-light  rounded-[2rem]">
            <div className="flex flex-1 flex-col items-center gap-4">
                <h1 className="text-5xl font-extrabold">Your Scan</h1>
            </div>
            <div className="flex flex-1 flex-col gap-4 items-center">
                <Card>
                    <IconizedBadge icon={<ScrollText />} title="your result" />
                </Card>
            </div>
        </div>
    );
};

export default Page;
