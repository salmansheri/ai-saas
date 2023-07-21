import { Metadata } from "next";
import ConversationClient from "./components/client";

export const metadata: Metadata = {
  title: "Conversations - Genius",
};

export default function ConversationPage() {
  return (
    <div>
      <ConversationClient />
    </div>
  );
}
