import React from "react";

interface PageSidebarSlotProps {
    selected: boolean;
    title: string;
    icon: React.ReactNode;
}
function PageSidebarSlot(props: PageSidebarSlotProps) {
    return (
        <div className="w-full">
            <div className="bg-jas-grey-light rounded-2xl  py-2 px-4 w-full flex gap-2 items-center">
                <div className="bg-jas p-2 rounded-lg">{props.icon}</div>
                <h1 className="text-2xl font-bold">{props.title}</h1>
            </div>
        </div>
    );
}

export default PageSidebarSlot;
