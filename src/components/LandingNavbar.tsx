"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link className="flex items-center" href="/">
        <div className="relative h-8 w-8 mr-4">
          <Image fill src="/logo.png" alt="logo" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Genius
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "rounded-full",
          )}
          href={isSignedIn ? "/dashboard" : "/sign-up"}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
