import { Metadata } from "next";
import ConversationClient from "./components/client";
import ImageGenerationClient from "./components/client";

export const metadata: Metadata = {
  title: "Conversations - Genius"
}

export default function ImageGeneration() {
  return (
    <div>
      <ImageGenerationClient />
    </div>
  );
}
