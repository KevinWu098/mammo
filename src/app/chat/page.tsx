"use client";

import { FormEvent, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useChat } from "ai/react";
import { ArrowUp, MoveDiagonal, Plus, Sparkles } from "lucide-react";
import ActionCard from "@/components/ActionCard";
import {SelfLoveTag, ExerciseTag} from "@/components/ui/tag";
import Check from "@/components/ui/check";
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

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/gemini/",
  });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let intervalId: any;

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

  return (
    <div className="h-full flex justify-between gap-x-8">
  <ScrollArea
    className="flex flex-1 bg-jas-grey_light px-6 py-4 rounded-3xl gap-8"
   
  >
    <div  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <h1 className="text-5xl font-extrabold">Actions</h1>
    <Check
    props={{
        title:"eat more healthy"
    }}
    />
    <ActionCard
      props={{
        title: "Eat more healthy food",
        Tag: <SelfLoveTag />
      }}
    />
    </div>
  </ScrollArea>

      <div className="h-full flex-col w-[500px] relative">
        <h1 className="text-5xl font-bold mb-8">Ask something</h1>

        <ScrollArea
          className="flex flex-col space-y-4 h-[600px] rounded-md min-w-fit pr-8"
          id="messageContainer"
        >
          <div
            className="space-y-4 justify-end items-end flex flex-col"
            ref={ref}
          >
            {messages.map((m, index) => (
              <div key={m.id}>
                {m.role === "user" ? (
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
                    <div className="text-black text-opacity-50 font-semibold">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <>
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
                        <div className="text-black text-opacity-50 font-semibold">
                          {m.content}
                        </div>
                      </div>
                    </div>

                    {index == messages.length - 1 && m.role == "assistant" ? (
                      <div className="flex-center flex-col gap-y-4">
                        <Button className="mx-auto mt-4 flex flex-row gap-x-2 rounded-xl bg-jas-blue hover:bg-jas-blue/80">
                          <Plus /> <span>add to actions</span>
                        </Button>
                        <div className="mx-auto">
                          <span className="font-bold text-xl text-black text-opacity-50">
                            or
                          </span>
                        </div>
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
                            <span>reccomend</span>
                          </Button>
                        </div>
                      </div>
                    ) : null}
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
            className="w-full py-6 text-lg border-0 bg-jas-grey_light rounded-xl"
          />

          <Button type="submit" className="h-12 w-12 rounded-xl">
            <ArrowUp />
          </Button>
        </form>
      </div>
    </div>
  );
}
