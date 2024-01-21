import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { Action } from "@/app/chat/page";
import { Separator } from "@radix-ui/react-separator";
import { Message } from "ai";
import { MoveDiagonal, Plus, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

function AssistantChatBubble({
  index,
  messages,
  m,
  setAction,
  actions,
}: {
  index: number;
  messages: Message[];
  m: Message;
  setAction: Dispatch<SetStateAction<Action[]>>;
  actions: Action[];
}) {
  // parse the message into many smaller messages
    // TODO: probably do some error catching if possible in case the Gemini output is malformed
    console.log(m.content);
    const mJSON = JSON.parse(m.content);

    let mJSONBlocks = mJSON.data;
    
    // check if the thing is an object
    if (typeof mJSONBlocks[0] !== "object") {
        // fallback
        mJSONBlocks = [
            {
                text: "I cannot answer this. Please consult a licensed doctor for more information.",
                action: "Consult a licensed doctor for more information.",
                action_link: "https://doctor.webmd.com",
                action_tag: "medical"
            }
        ]
    }

  // generate a separate bubble for each

  function handleAddAction(
    e: any,
    messageAction: string | undefined,
    messageLink: string | undefined,
    messageTag: string | undefined,
  ) {
    // create the action object
    const title = messageAction ?? "Fallback Title";
    const tag = messageTag ?? "Fallback Tag";
    const link = messageLink ?? "Fallback Link";

    const action: Action = {
      title: title,
      items: [
        {
          title: title,
          tag: tag,
          link: link,
        },
      ],
    };

    // add this new action to the list
    setAction([...actions, action]);
  }

  return (
    <>
      {mJSONBlocks.map(
        (
          message: {
            text: string;
            action?: string;
            action_link?: string;
            action_tag?: string;
          },
        ) => {
          const messageContent = message.text;
              const messageAction = message.action;
              const messageLink = message.action_link;
              console.log(messageAction)
              console.log(messageLink)
          const messageTag = message.action_tag;
          return (
            <React.Fragment key={messageContent}>
              <div className="bg-[#D3D8DC] rounded-xl p-4 flex flex-row gap-x-2 my-2">
                <Avatar className="size-8">
                  <AvatarImage
                    src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3212952/robot-icon-md.png"
                    alt="@agentic"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex gap-y-2 flex-col">
                  <div className="flex items-center gap-x-2 flex-row">
                    <span className="font-bold text-xl">your AI doc</span>
                  </div>
                  <div className="text-black text-opacity-50 font-semibold flex-nowrap break-words max-w-[400px]">
                    <span className="min-w-0">{messageContent}</span>
                  </div>
                </div>
              </div>

              {m.role == "assistant" ? (
              <div className="flex-center flex-col gap-y-2 mb-8 mt-2">
                  {messageAction && messageLink ? (
                    <>
                      <Button
                        className="mx-auto flex flex-row gap-x-2 rounded-xl bg-jas-blue hover:bg-jas-blue/80"
                        onClick={(e) =>
                          handleAddAction(
                            e,
                            messageAction,
                            messageLink,
                            messageTag,
                          )
                        }
                      >
                        <Plus /> <span>add to actions</span>
                      </Button>
                    </>
                  ) : null}
                </div>
              ) : null}
            </React.Fragment>
          );
        },
      )}
    </>
  );
}

export default AssistantChatBubble;
