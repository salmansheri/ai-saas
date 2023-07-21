import { Metadata } from "next";
import VideoGenerationClient from "./components/client";

export const metadata: Metadata = {
  title: "Video Generation - Genius",
};

export default function VideoGenerationPage() {
  return (
    <div>
      <VideoGenerationClient />
    </div>
  );
}
