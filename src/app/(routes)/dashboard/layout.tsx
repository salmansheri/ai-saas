import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Genius",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
