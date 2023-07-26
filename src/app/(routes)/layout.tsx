import Navbar from "@/components/nav-bar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
