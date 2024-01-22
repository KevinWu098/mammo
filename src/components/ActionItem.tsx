"use client";

import React, { useState } from "react";
import ActionCard from "./ActionCard";
import Check from "./ui/check";
import { ScrollArea } from "./ui/scroll-area";
import {
  DietTag,
  ExerciseTag,
  MedicalTag,
  PurchaseTag,
  SelfLoveTag,
} from "./ui/tag";
import { Action } from "@/app/chat/page";

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
            {props.action.items.map((item) => {
              let tagComponent;
              switch (item.tag) {
                case "self-care":
                  tagComponent = <SelfLoveTag />;
                  break;
                case "purchase":
                  tagComponent = <PurchaseTag />;
                  break;
                case "diet":
                  tagComponent = <DietTag />;
                  break;
                case "medical":
                  tagComponent = <MedicalTag />;
                  break;
                case "exercise":
                  tagComponent = <ExerciseTag />;
                  break;
                default:
                  tagComponent = <MedicalTag />;
              }
              return (
                <ActionCard
                  props={{
                    title: item.title,
                    Tag: tagComponent,
                    link: item.link,
                    special: "chat",
                  }}
                />
              );
            })}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default ActionItem;
