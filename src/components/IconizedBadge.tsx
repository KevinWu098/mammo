import React from "react";

import { Badge } from "./ui/badge";

interface IconizedBadgeProps {
    icon: React.ReactNode;
    title: string;
}
function IconizedBadge(props: IconizedBadgeProps) {
    return (
        <Badge className=" px-6 py-2 bg-[#E5E5E5] text-jas-grey  rounded-xl outline-jas-grey gap-2 hover:bg-[#E5E5E5]">
            {props.icon}
            <h1 style={{fontSize:'18px'}}>{props.title}</h1>
        </Badge>
    );
}

export default IconizedBadge;
