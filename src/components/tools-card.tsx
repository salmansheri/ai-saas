import { toolsType } from "@/constants";
import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ToolsCardProps {
  data: toolsType;
}

const ToolsCard: React.FC<ToolsCardProps> = ({ data }) => {
  return (
    <Card className="p-3 border-black/5 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div className={cn("p-2 w-fit rounded-md", data.bgColor)}>
          <data.icon className={cn("w-6 h-6", data.color)} />
        </div>
        <div className="font-semibold text-sm">{data.label}</div>
      </div>
      <Check className="text-primary w-5 h-5" />
    </Card>
  );
};

export default ToolsCard;
