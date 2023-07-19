"use client";

import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React from "react";

const ConversationClient = () => {
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
        <div></div>
      </div>
    </>
  );
};

export default ConversationClient;
