"use client";

import { useEffect, useRef, useState } from "react";
import ActionCard from "@/components/ActionCard";
import ActionItem from "@/components/ActionItem";
import AssistantChatBubble from "@/components/AssistantChatBubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Check from "@/components/ui/check";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SelfLoveTag } from "@/components/ui/tag";
import { useChat } from "ai/react";
import { ArrowUp, Loader2, MoveDiagonal, Plus, Sparkles } from "lucide-react";

const messages = [
  { id: 1, role: "user", content: "What should I eat?" },
  {
    id: 2,
    role: "ai",
    content: "Eat plenty of foods filled with antioxidants, like strawberries.",
  },
  {
    id: 3,
    role: "ai",
    content: "Eat chiken.",
  },
  {
    id: 4,
    role: "user",
    content: "Eat chiken.",
  },
  {
    id: 5,
    role: "ai",
    content:
      "Eat plenty of foods filled with antioxidants, like fasdfasiuefhasdkj fasdskjfhadskjfhadskjfh.",
  },
];

export type Action = {
  title: string;
  items: [{ title: string; tag: string; link: string }];
};

const ACTIONS: Action[] = [
  {
    title: "Eat healthy",
    items: [
      {
        title: "eat more healthy",
        tag: "self-care",
        link: "https://google.com",
      },
    ],
  },
];

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/gemini/",
  });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollIntoViewInterval = () => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    scrollIntoViewInterval();

    return () => scrollIntoViewInterval();
  }, [messages]);

  const [actions, setActions] = useState<Action[]>([]);

  return (
    <div className="h-full flex justify-between gap-x-8">
      <div className="flex flex-1 bg-jas-grey_light px-6 py-4 rounded-3xl gap-8">
        <div className="w-full h-fit flex gap-3 flex-col">
          <h1 className="text-5xl font-extrabold">Actions</h1>

          <ScrollArea className="w-full h-[720px]">
            <div className="space-y-4">
              {actions.map((action) => (
                <ActionItem action={action} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="h-full flex-col w-[500px] relative">
        <h1 className="text-5xl font-bold mb-3 pt-4">Ask something</h1>

        <ScrollArea
          className="flex flex-col space-y-4 h-[600px] rounded-md max-w-fit pr-8"
          id="messageContainer"
        >
          <div
            className="space-y-4 justify-end items-end flex flex-col"
            ref={ref}
          >
            {messages.map((m, index) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="space-y-4">
                    <div className="bg-jas-grey_light rounded-xl p-4 flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-2 flex-row">
                        <Avatar className="size-8">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-xl">you</span>
                      </div>
                      <div className="text-black text-opacity-50 font-semibold flex-nowrap break-words max-w-[400px]">
                        <span className="min-w-0">{m.content}</span>
                      </div>
                    </div>

                    {index == messages.length - 1 && m.role == "user" && (
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
                            <span className="font-bold text-xl">
                              your AI doc
                            </span>
                          </div>

                          <Loader2 className="animate-spin mx-auto" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <AssistantChatBubble
                      index={index}
                      messages={messages}
                      m={m}
                      actions={actions}
                      setAction={setActions}
                    />
                    <div className="flex flex-col items-center justify-center mt-4">
                      <div className="mx-auto">
                        <span className="font-bold text-xl text-black text-opacity-50  text-center">
                          Ask a follow-up question
                        </span>
                      </div>
                      {/* <div className="flex flex-row gap-x-4">
                        <Button className="mx-auto mt-4 flex flex-row gap-x-2 rounded-xl bg-jas-grey_light text-back hover:bg-jas-grey_light/80">
                          <MoveDiagonal />
                          <span>elaborate</span>
                        </Button>
                        <Button className="mx-auto mt-4 flex flex-row gap-x-2 rounded-xl bg-jas-grey_light text-back hover:bg-jas-grey_light/80">
                          <Sparkles />
                          <span>recommend</span>
                        </Button>
                      </div> */}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0 w-full flex flex-row gap-x-2"
        >
          <Input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className="input-form w-full py-6 text-lg border-0 bg-jas-grey_light rounded-xl hover:border-blue-500 focus:border-blue-500 focus:outline-none"
          />

          <Button type="submit" className="h-12 w-12 rounded-xl">
            <ArrowUp 
            style={{fontSize:'30px'}}
            />
          </Button>
        </form>
      </div>
    </div>
  );
}
