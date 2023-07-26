"use client";

import EmptyState from "@/components/empty-state";
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
import Loading from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";
import useProModal from "@/hooks/use-pro-modal";
import {
  ConversationFormSchema,
  ConversationFormType,
} from "@/lib/validators/conversation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const VideoGenerationClient = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState("");
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
      setVideo("");

      const response = await axios.post("/api/video-generation", data);

      setVideo(response.data[0]);

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
          title="Video Generation"
          description="Most advance AI Video Generation"
          icon={VideoIcon}
          iconColor="text-orange-700"
          bgColor="text-orange-700/10"
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
            {!video && !isLoading && <EmptyState label="No Video Started" />}
            {video && (
              <video
                controls
                className="w-full aspect-video mt-8 rounded-lg border bg-black"
              >
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoGenerationClient;
