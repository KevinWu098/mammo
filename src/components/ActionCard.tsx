import React from "react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ActionCardProps {
    title: string;
    color: string;
    iconlabel: string;
    icon: React.ReactNode;
}
function ActionCard(props: ActionCardProps) {
    return (
        <Card className="rounded-3xl flex gap-2 p-4 w-full items-center justify-between h-full">
            <div className="flex gap-2 h-full">
                <Card className="w-[5rem] h-[5rem] rounded-2xl"></Card>
                <div className="flex flex-col justify-between h-full ">
                    <h1 className="text-xl font-bold">{props.title}</h1>
                    <div className="flex gap-2 py-2 px-4 rounded-xl bg-jas w-fit">
                        {props.icon}
                        <h4 className="font-semibold text-md     text-blue-600">
                            {props.iconlabel}
                        </h4>
                    </div>
                </div>
            </div>
            <Button className="bg-jas rounded-xl font-bold text-lg">
                take action
            </Button>
        </Card>
    );
}
export default ActionCard;
