import React, { useState } from "react";

import { Card } from "./card";

interface checkProps {
  title: string;
  checked: boolean;
  onClick: () => void;
}

function check(props: checkProps) {
  return (
    <div>
      <Card className="rounded-3xl flex gap-4 p-4 w-full items-center align-center justify-between h-full border-4 hover:border-[#0094FF]">
        <div className="flex gap-4 h-full items-center">
          <input
            type="checkbox"
            checked={props.checked}
            onClick={props.onClick}
            className=" cursor-pointer form-checkbox bg-jas-blue h-6 w-6 rounded-xl hover:bg-jas-blue"
          />
          <div className="flex flex-col justify-between h-full gap-2">
            <h1 className="text-xl font-extrabold">{props.title}</h1>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default check;
