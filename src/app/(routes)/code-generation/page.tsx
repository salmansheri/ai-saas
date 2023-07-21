import { Metadata } from "next";
import ConversationClient from "./components/client";

export const metadata: Metadata = {
  title: "Code Generation - Genius",
};

export default function CodeGenerationPage() {
  return (
    <div>
      <ConversationClient />
    </div>
  );
}
