"use client";

import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import BotAvatar from "@/components/ui/bot-avatar";
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
import Loading from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";
import { UserAvatar } from "@/components/ui/user-avatar";
import useProModal from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import {
  ConversationFormSchema,
  ConversationFormType,
} from "@/lib/validators/conversation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ConversationClient = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<ConversationFormType>({
    resolver: zodResolver(ConversationFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  let prompt = form.watch("prompt");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ConversationFormType> = async (
    data: ConversationFormType,
  ) => {
    try {
      setIsLoading(true);
      const userMessages: ChatCompletionRequestMessage = {
        role: "user",
        content: data.prompt,
      };

      const newMessages = [...messages, userMessages];

      const response = await axios.post("/api/conversations", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessages, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        return proModal.onOpen(); // if error status is 403 it will open pro Modal dialog
      }
      return toast({
        title: "something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                  disabled={prompt === "" || isLoading}
                  className="disabled:cursor-not-allowed col-span-12 lg:col-span-2 w-full"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate</>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {isLoading && <Loading />}
            {messages.length === 0 && !isLoading && (
              <EmptyState label="No Conversations Started" />
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div
                  key={message.content}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user"
                      ? "flex-row-reverse bg-white border border-black/10 "
                      : "bg-muted flex-row",
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  {message.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationClient;
