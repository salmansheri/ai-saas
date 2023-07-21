import { Metadata } from "next";
import MusicGenerationClient from "./components/client";

export const metadata: Metadata = {
  title: "Music Generation - Genius",
};

export default function MusicGenerationPage() {
  return (
    <div>
      <MusicGenerationClient />
    </div>
  );
}
