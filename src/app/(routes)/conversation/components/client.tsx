"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ConversationFormSchema,
  ConversationFormType,
} from "@/lib/validators/conversation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ConversationClient = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<ConversationFormType>({
    resolver: zodResolver(ConversationFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  let prompt = form.watch("prompt");


  const onSubmit: SubmitHandler<ConversationFormType> = async (
    data: ConversationFormType
  ) => {
    try {
      const userMessages: ChatCompletionRequestMessage = {
        role: "user",
        content: data.prompt,
      };

      const newMessages = [...messages, userMessages];

      const response = await axios.post("/api/conversations", {
        messages: newMessages,
      });

      setMessages((current) => [...current, response.data]);
    } catch (error) {
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Conversations"
          description="Most advance"
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="text-violet-500/10"
        />
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 grid-cols-12 focus-within:shadow-sm grid gap-2"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl>
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          placeholder="Enter Prompt"
                          {...field}
                          // disabled={isLoading}
                          autoFocus
                        />
                      </FormControl>
                      <FormDescription>Enter Your Prompt Here</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={prompt === ""}
                  className="disabled:cursor-not-allowed col-span-12 lg:col-span-2 w-full"
                  type="submit"
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div key={message.content}>{message.content}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationClient;
