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
import { cn } from "@/lib/utils";
import {
  ConversationFormSchema,
  ConversationFormType,
} from "@/lib/validators/conversation-schema";
import { ImageGenerationSchema, ImageGenerationType } from "@/lib/validators/image-generation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ImageGenerationClient = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<ImageGenerationType>({
    resolver: zodResolver(ImageGenerationSchema),
    defaultValues: {
      prompt: "",
    },
  });

  let prompt = form.watch("prompt");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ImageGenerationType> = async (
    data: ImageGenerationType
  ) => {
    try {
      setIsLoading(true);
      const userMessages: ChatCompletionRequestMessage = {
        role: "user",
        content: data.prompt,
      };

      const newMessages = [...messages, userMessages];

      const response = await axios.post("/api/image-generation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessages, response.data]);
      form.reset();
    } catch (error) {
      return toast({
        title: "some",
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
          title="Image Generation"
          description="Most advance AI Image Generation"
          icon={ImageIcon}
          iconColor="text-pink-700"
          bgColor="text-pink-700/10"
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
                          disabled={isLoading}
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
                      : "bg-muted flex-row"
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

export default ImageGenerationClient;
