import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
      <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 relative animate-spin">
          <Image
            alt="logo"
            fill
            src="https://github.com/AntonioErdeljac/next13-ai-saas/blob/master/public/logo.png?raw=true"
          />
        </div>
        <p className="text-sm text-muted-foreground">Genius is thinking...</p>
      </div>
    </div>
  );
};

export default Loading;
