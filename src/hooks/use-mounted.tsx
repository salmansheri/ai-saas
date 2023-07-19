"use client";

import { useState, useEffect } from "react";

export const UseMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isMounted,
  };
};
