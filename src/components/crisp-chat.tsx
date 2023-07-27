"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("77080d60-8949-4f04-aa79-5e0afee180e9");
  }, []);

  return null;
};

export default CrispChat;
