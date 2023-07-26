"use client";
import ProModal from "@/components/modal/pro-modal";
import { UseMounted } from "@/hooks/use-mounted";

export const ModalProvider = () => {
  const isMounted = UseMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};
