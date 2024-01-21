import { ReactElement } from "react";
import Image from "next/image";
import ProfileForm from "@/components/ProfileForm";
import Screenings from "@/components/Screenings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarClock,
  MoveVertical,
  PersonStanding,
  Scale,
  ScaleIcon,
  Scaling,
  Upload,
} from "lucide-react";

export type Screening = {
  severity: number;
  date: string;
  id: number;
};
const SCREENINGS: Screening[] = [
  {
    severity: 88,
    date: "05/06/2005",
    id: 1,
  },
  {
    severity: 10,
    date: "01/05/2005",
    id: 2,
  },
  {
    severity: 42,
    date: "02/06/2004",
    id: 3,
  },
  {
    severity: 23,
    date: "07/15/2012",
    id: 4,
  },
  {
    severity: 64,
    date: "03/06/2005",
    id: 5,
  },
];

export type Card = {
  icon: ReactElement<any, any>;
  label: string;
  value: string;
};
const USER_CARDS: Card[] = [
  {
    icon: <CalendarClock />,
    label: "age",
    value: "23",
  },
  {
    icon: <MoveVertical />,
    label: "height",
    value: "5'6\"",
  },
  {
    icon: <Scale />,
    label: "weight",
    value: "125",
  },
  {
    icon: <PersonStanding />,
    label: "gender",
    value: "F",
  },
];

const Page = () => {
  return (
    <div className="flex justify-center min-h-[calc(100vh-6rem-64px)] gap-x-8 rounded-[2rem] h-full">
      <div className="flex flex-col w-full h-full bg-jas-grey_light p-8   rounded-2xl">
        <div className="flex-between w-full mb-16">
          <h1 className="text-5xl font-bold">Your screenings</h1>

          <Button className="p-5 py-6 flex flex-row gap-x-2 bg-jas-blue hover:bg-jas-blue/80 rounded-xl">
            <Upload className="size-5" /> Share with doctor
          </Button>
        </div>

        <Screenings screenings={SCREENINGS} />
      </div>

      <div className="min-w-[500px] rounded-none -mx-8 justify-center flex flex-col items-center">
        <CardHeader className="flex-center flex-col  pt-0 text-4xl">
          <Avatar className="size-40">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          <CardTitle className="text-4xl font-extrabold">Jane D.</CardTitle>
          <CardTitle className="text-2xl font-extrabold text-jas-grey">
            Cancer Patient
          </CardTitle>
        </CardHeader>

        <CardContent className="mx-[3.85rem]">
          <div className="grid grid-cols-2 gap-2">
            {USER_CARDS.map((card) => (
              <div
                className="bg-jas-grey_light size-40 text-5xl font-bold rounded-2xl flex-center flex-col gap-y-2 m-auto"
                key={card.label}
              >
                <Badge className="w-fit space-x-1 bg-jas-blue border-3 px-3 py-1 bg-opacity-25 text-jas-blue border-jas-blue border-opacity-50 hover:bg-jas-blue/25 border-[3px]">
                  {card.icon} <span>{card.label}</span>
                </Badge>
                <span>{card.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <Card className="w-4/5 p-4 bg-jas-grey_light flex flex-col items-center gap-2">
          <CardTitle className="text-3xl font-extrabold flex justify-between items-center w-full">
            health trends
            <Scaling
              className="p-3 bg-[#0094ff] rounded-xl"
              color="white"
              size={50}
            />
          </CardTitle>
          <div className="flex relative w-full justify-center">
            <Image
              src={"chart.svg"}
              alt="tim's cute chart"
              width={100}
              height={100}
              className="w-3/5"
            ></Image>
          </div>
          <CardFooter className="font-semibold [word-spacing:20px] ">
            Jan Feb Mar Apr May
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
