import ProfileForm from "@/components/ProfileForm";
import Screenings from "@/components/Screenings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Upload } from "lucide-react";

export type Screening = {
    severity: number;
    date: string;
    id: number;
};
const SCREENINGS: Screening[] = [
    {
        severity: 88,
        date: "01/06/2005",
        id: 1,
    },
    {
        severity: 10,
        date: "01/05/2005",
        id: 2,
    },
    {
        severity: 2,
        date: "02/06/2004",
        id: 3,
    },
    {
        severity: 3,
        date: "07/15/2012",
        id: 4,
    },
    {
        severity: 0,
        date: "03/06/2005",
        id: 5,
    },
];

const Page = () => {
    return (
        <div className="flex justify-center min-h-[calc(100vh-6rem-64px)] gap-x-8 rounded-[2rem]">
            <div className="flex flex-col w-full h-full bg-jas-grey_light p-8 rounded-2xl">
                <div className="flex-between w-full mb-16">
                    <h1 className="text-5xl font-bold">Your screenings</h1>

                    <Button className="p-5 flex flex-row gap-x-2 bg-jas-blue hover:bg-jas-blue/80">
                        <Upload className="size-5" /> Share with doctor
                    </Button>
                </div>

                <Screenings screenings={SCREENINGS} />
            </div>

            <div className="min-w-[500px] rounded-none -mx-8">
                <CardHeader className="flex-center flex-col gap-y-4 pt-0 text-4xl">
                    <Avatar className="size-40">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>M</AvatarFallback>
                    </Avatar>

                    <CardTitle className="text-4xl">Jane D.</CardTitle>
                </CardHeader>

                {/* <CardContent className="w-[400px] mx-auto">
                    <ProfileForm />
                </CardContent> */}

                <CardContent className="mx-[3.85rem]">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-jas-grey_light size-40 text-5xl font-bold rounded-2xl flex-center flex-col gap-y-1 m-auto">
                            <Badge className="w-fit space-x-1 bg-jas-blue border-3 px-3 py-1 bg-opacity-25 text-jas-blue border-jas-blue border-opacity-50 hover:bg-jas-blue/25 border-[3px]">
                                <CalendarClock /> <span>age</span>
                            </Badge>
                            <span>23</span>
                        </div>
                        <div className="bg-jas-grey_light size-40 text-5xl font-bold rounded-2xl flex-center flex-col gap-y-1 m-auto">
                            <Badge className="w-fit space-x-1 bg-jas-blue border-3 px-3 py-1 bg-opacity-25 text-jas-blue border-jas-blue border-opacity-50 hover:bg-jas-blue/25 border-[3px]">
                                <CalendarClock /> <span>age</span>
                            </Badge>
                            <span>23</span>
                        </div>
                        <div className="bg-jas-grey_light size-40 text-5xl font-bold rounded-2xl flex-center flex-col gap-y-1 m-auto">
                            <Badge className="w-fit space-x-1 bg-jas-blue border-3 px-3 py-1 bg-opacity-25 text-jas-blue border-jas-blue border-opacity-50 hover:bg-jas-blue/25 border-[3px]">
                                <CalendarClock /> <span>age</span>
                            </Badge>
                            <span>23</span>
                        </div>
                        <div className="bg-jas-grey_light size-40 text-5xl font-bold rounded-2xl flex-center flex-col gap-y-1 m-auto">
                            <Badge className="w-fit space-x-1 bg-jas-blue border-3 px-3 py-1 bg-opacity-25 text-jas-blue border-jas-blue border-opacity-50 hover:bg-jas-blue/25 border-[3px]">
                                <CalendarClock /> <span>age</span>
                            </Badge>
                            <span>23</span>
                        </div>
                    </div>
                </CardContent>
            </div>
        </div>
    );
};

export default Page;
