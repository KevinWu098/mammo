"use client";

import { useState } from "react";
import { Screening } from "@/app/dashboard/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock, Filter, ListFilter } from "lucide-react";

export type Filter_Option = {
    value: "recent" | "severity" | "scan";
    label: string;
};
const Filter_Options: Filter_Option[] = [
    {
        value: "recent",
        label: "most recent",
    },
    {
        value: "severity",
        label: "severity",
    },
    {
        value: "scan",
        label: "scan included",
    },
];

interface Screenings {
    screenings: Screening[];
}

const Screenings = (props: Screenings) => {
    const [sort, setSort] = useState<"recent" | "severity" | "scan">("recent");

    const screenings =
        sort == "recent"
            ? props.screenings.sort(
                  (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
            : props.screenings.sort((a, b) => b.severity - a.severity);

    return (
        <>
            <div className="space-x-4 mb-2 flex items-center flex-row ">
                <div className="bg-jas-grey_dark p-2 rounded-lg">
                    <ListFilter />
                </div>
                {Filter_Options.map((filter) => (
                    <Button
                        className={cn(
                            "rounded-lg font-semibold",
                            sort == filter.value &&
                                "bg-jas-blue hover:bg-jas-blue/80",
                        )}
                        onClick={() => setSort(filter.value)}
                        key={filter.label}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>

            {/* <div className="flex flex-col gap-y-4 overflow-scroll h-[550px]"> */}
            <ScrollArea className="flex flex-col space-y-4 h-[585px] rounded-md">
                {screenings.map((screening) => (
                    <Card
                        className="flex-between flex-row rounded-2xl h-fit mb-4 border-0"
                        key={screening.id}
                    >
                        <CardHeader className="flex flex-row flex-center gap-x-4">
                            <div className="text-3xl font-bold bg-jas-grey_light size-20 flex-center rounded-2xl">
                                {screening.severity.toString().padStart(2, "0")}
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <div>
                                    <CardDescription className="text-xs font-semibold text-black opacity-50">
                                        HEALTH SCORE
                                    </CardDescription>
                                    <CardTitle className="text-3xl font-bold">
                                        Healthy
                                    </CardTitle>
                                </div>

                                {/* use tooltip? */}
                                <div className="flex flex-row gap-x-2">
                                    <Badge className="p-2 w-fit rounded-xl flex gap-x-2 border-2 text-[#8B8B8B] font-bold bg-[#F2F2F2] hover:bg-[#F2F2F2]">
                                        <Clock
                                            className="size-4 text-[#F2F2F2]"
                                            fill="#737373"
                                        />
                                        <span>{screening.date}</span>
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-center pt-6 gap-x-2">
                            <Button className="rounded-xl bg-jas-grey_dark text-white hover:bg-jas-grey_dark/80">
                                view scan
                            </Button>

                            <Button className="bg-jas-blue rounded-xl hover:bg-jas-blue/80">
                                send
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </>
    );
};

export default Screenings;
