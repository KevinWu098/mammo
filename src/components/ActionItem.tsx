"use client";

import React, { useState } from "react";
import { Action } from "@/app/chat/page";

import ActionCard from "./ActionCard";
import Check from "./ui/check";
import { ScrollArea } from "./ui/scroll-area";
import { SelfLoveTag } from "./ui/tag";

interface ActionItemInterface {
  action: Action;
}

const ActionItem = (props: ActionItemInterface) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <ScrollArea>
      <div className="flex flex-col gap-3">
        <Check
          title={props.action.title}
          checked={checked}
          onClick={handleClick}
        />

        {!checked && (
          <>
            {props.action.items.map((item) => (
              <ActionCard
                props={{
                  title: item.title,
                  Tag: item.tag == "self-care" && <SelfLoveTag />,
                  link: item.link,
                }}
              />
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default ActionItem;
