import LandingNavbar from "@/components/LandingNavbar";
import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";

export default function Home() {
  return (
    <main className="h-full bg-[#111827] overflow-auto  w-full">
      <div className="mx-auto  h-full w-full max-w-screen-xl">
        <div className="h-full">
          <LandingNavbar />
          <LandingHero />
          <LandingContent />
        </div>
      </div>
    </main>
  );
}
