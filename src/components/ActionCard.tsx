import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ActionCardProps {
  title: string;
  Tag: React.ReactNode;
  link: string;
}
function ActionCard({ props }: { props: ActionCardProps }) {
  return (
    <Card className="rounded-3xl flex gap-4 p-4 w-full items-center align-center justify-between h-full">
      <div className="flex gap-4 h-full items-center">
        <Card className="w-[6rem] h-[6rem] rounded-2xl"></Card>
        <div className="flex flex-col justify-between h-full gap-2">
          <h1 className="text-xl font-extrabold">{props.title}</h1>

          {props.Tag}
        </div>
      </div>

      <Link href={props.link} target="_blank" referrerPolicy="no-referrer">
        <Button className="bg-jas-blue rounded-xl font-bold text-lg">
          take action
        </Button>
      </Link>
    </Card>
  );
}
export default ActionCard;
