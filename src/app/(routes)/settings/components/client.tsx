"use client";

import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { Settings } from "lucide-react";
import React from "react";

interface SettingsClientProps {
  isPro: boolean;
}

const SettingsClient: React.FC<SettingsClientProps> = ({ isPro }) => {
  return (
    <>
      <Heading
        title="Settins"
        description="Manage account Settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are Currently on a Pro plan"
            : "You are currently on a Free Plan"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  );
};

export default SettingsClient;
