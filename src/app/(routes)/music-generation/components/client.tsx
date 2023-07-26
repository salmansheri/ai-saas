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
import { initialState } from "@clerk/nextjs/dist/types/app-router/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, MessageSquare, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const MusicGenerationClient = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>("");
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
      setMusic("");

      const response = await axios.post("/api/music-generation", data);

      setMusic(response.data.audio);

      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        return proModal.onOpen();
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
          title="Music Generation"
          description="Most advance AI Music Generation"
          icon={Music}
          iconColor="text-emerald-500"
          bgColor="text-emerald-500/10"
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
            {!music && !isLoading && (
              <EmptyState label="No Conversations Started" />
            )}
            {music && (
              <audio controls className="w-full mt-8">
                <source src={music} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicGenerationClient;
