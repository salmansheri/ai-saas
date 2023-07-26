import {
  Code,
  ImageIcon,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  Music,
  Settings,
  Video,
  VideoIcon,
} from "lucide-react";

export type routesType = {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
};

export type toolsType = {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  href: string;
};

export const routes: Array<routesType> = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generation",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: Video,
    href: "/video-generation",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music-generation",
    color: "text-emerald-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code-generation",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const tools: toolsType[] = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music-generation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image-generation",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video-generation",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code-generation",
  },
];

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photo",
  },
  {
    value: "3",
    label: "3 Photo",
  },
  {
    value: "4",
    label: "4 Photo",
  },
  {
    value: "5",
    label: "5 Photo",
  },
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];

export const MAX_FREE_COUNTS = 5;
