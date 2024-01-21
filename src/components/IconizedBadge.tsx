import React from "react";

import { Badge } from "./ui/badge";

interface IconizedBadgeProps {
    icon: React.ReactNode;
    title: string;
}
function IconizedBadge(props: IconizedBadgeProps) {
    return (
        <Badge className="text-lg px-6 py-2 bg-jas-grey_medium text-jas-grey outline outline-4 rounded-xl outline-jas-grey gap-2 hover:bg-jas-grey_light cursor-pointer">
            {props.icon}
            <h1>{props.title}</h1>
        </Badge>
    );
}

export default IconizedBadge;
