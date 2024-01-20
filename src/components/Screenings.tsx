"use client";

import { useState } from "react";
import { Screening } from "@/app/dashboard/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Screenings {
    screenings: Screening[];
}

const Screenings = (props: Screenings) => {
    const [sort, setSort] = useState<"recent" | "severity">("recent");

    const screenings =
        sort == "recent"
            ? props.screenings.sort(
                  (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
            : props.screenings.sort((a, b) => b.severity - a.severity);

    return (
        <>
            <div className="space-x-4 mb-6">
                <span className="text-xl font-semibold">Sort by:</span>
                <Button
                    className={cn(
                        "text-lg p-5",
                        sort == "recent" && "bg-green-500 hover:bg-green-500",
                    )}
                    onClick={() => setSort("recent")}
                >
                    Recent
                </Button>
                <Button
                    className={cn(
                        "text-lg p-5",
                        sort == "severity" && "bg-green-500 hover:bg-green-500",
                    )}
                    onClick={() => setSort("severity")}
                >
                    Severity
                </Button>
            </div>

            <div className="flex flex-col gap-y-4 overflow-scroll h-[550px]">
                {screenings.map((screening, index) => (
                    <Card
                        className="flex-between flex-row rounded-sm h-fit"
                        key={screening.id}
                    >
                        <CardHeader className="flex flex-row flex-center gap-x-4">
                            <div className="flex flex-col gap-y-2">
                                <CardTitle className="text-3xl">
                                    {screening.severity} - Healthy
                                </CardTitle>

                                {/* use tooltip? */}
                                <div className="flex flex-row gap-x-2">
                                    <Badge className="p-2 w-fit">
                                        {screening.date}
                                    </Badge>
                                    {/* <Badge className="p-2 w-fit">
                                {screening.severity} / 100
                            </Badge> */}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-center pt-6">
                            <Button>Export Screening</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Screenings;
