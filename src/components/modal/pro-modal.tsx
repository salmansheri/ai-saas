"use client";
import { tools } from "@/constants";
import { UseMounted } from "@/hooks/use-mounted";
import useProModal from "@/hooks/use-pro-modal";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import ToolsCard from "../tools-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const ProModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const proModal = useProModal();
  const isMounted = UseMounted();

  if (!isMounted) {
    return null;
  }

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
      console.log(response.data.url);
    } catch (error) {
      console.log(error, "Stripe client error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 spze-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <ToolsCard key={tool.href} data={tool} />
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubscribe} variant="premium">
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
