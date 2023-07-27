import Heading from "@/components/heading";
import SettingsClient from "./components/client";
import { checkSubscription } from "@/lib/stripe/subscription";

export default async function SettingPage() {
  const isPro = await checkSubscription();

  return (
    <div>
      <SettingsClient isPro={isPro} />
    </div>
  );
}
