import { MoveDiagonal, Plus, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Message } from "ai";
import { Separator } from "@radix-ui/react-separator";
import { Dispatch, SetStateAction } from "react";
import { Action } from "@/app/chat/page";
import { MouseEvent } from "react";
import React from "react";

function AssistantChatBubble({ index, messages, m, setAction, actions }: { index: number, messages: Message[], m: Message, setAction: Dispatch<SetStateAction<Action[]>>, actions: Action[] }) {

    // parse the message into many smaller messages
    // TODO: probably do some error catching if possible in case the Gemini output is malformed
    const mJSON = JSON.parse(m.content);

    const mJSONBlocks = mJSON.data;


    // generate a separate bubble for each


    function handleAddAction(e: any, messageAction: string | undefined, messageLink: string | undefined, messageTag: string | undefined) {
        // create the action object
        const title = messageAction ?? "Fallback Title"
        const tag = messageTag ?? "Fallback Tag";
        const link = messageLink ?? "Fallback Link";

        const action: Action = {
            title: title,
            items: [{
                title: title,
                tag: tag,
                link: link
            }]
        }

        // add this new action to the list
        setAction([...actions, action])
    }

    return (
        <>
            {mJSONBlocks.map((message: { text: string, action?: string, action_link?: string, action_tag?: string }) => {
                const messageContent = message.text
                const messageAction = message.action;
                const messageLink = message.action_link;
                const messageTag = message.action_tag;
                return (
                    <React.Fragment key={messageContent}>
                        <div className="bg-[#D3D8DC] rounded-xl p-4 flex flex-row gap-x-2">
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

                        {index == messages.length - 1 && m.role == "assistant" ? (
                            <div className="flex-center flex-col gap-y-4">
                                {
                                    messageAction && messageLink ?
                                        <>
                                            <Button className="mx-auto mt-4 flex flex-row gap-x-2 rounded-xl bg-jas-blue hover:bg-jas-blue/80" onClick={(e) => handleAddAction(e, messageAction, messageLink, messageTag)}>
                                                <Plus /> <span>add to actions</span>
                                            </Button>
                                            <div className="mx-auto">
                                                <span className="font-bold text-xl text-black text-opacity-50">
                                                    or
                                                </span>
                                            </div>
                                        </>
                                        : null
                                }
                                <Separator className="h-1 bg-black bg-opacity-10" />
                                <div className="mx-auto">
                                    <span className="font-bold text-xl text-black text-opacity-50">
                                        Ask a follow-up question
                                    </span>
                                </div>
                                <div className="flex flex-row gap-x-4">
                                    <Button className="mx-auto mt-4 flex flex-row gap-x-2 rounded-xl bg-jas-grey_light text-back hover:bg-jas-grey_light/80">
                                        <MoveDiagonal />
                                        <span>elaborate</span>
                                    </Button>
                                    <Button className="mx-auto mt-4 flex flex-row gap-x-2 rounded-xl bg-jas-grey_light text-back hover:bg-jas-grey_light/80">
                                        <Sparkles />
                                        <span>recommend</span>
                                    </Button>
                                </div>
                            </div>
                        ) : null}
                    </React.Fragment>
                )
            })}
        </>

    )
}


export default AssistantChatBubble;