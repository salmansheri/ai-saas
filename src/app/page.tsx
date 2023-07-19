import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      hello world!
      <div>
        <Link href="/sign-in" className={cn(buttonVariants())}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
