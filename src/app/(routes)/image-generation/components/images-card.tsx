"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ImagesCardProps {
  src: string;
}

const ImagesCard: React.FC<ImagesCardProps> = ({ src }) => {
  return (
    <Card className="rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image src={src} alt={src} fill className="object-cover" />
      </div>
      <CardFooter>
        <Button
          onClick={() => window.open(src)}
          variant="secondary"
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImagesCard;
