"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
const NavigationBackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <div>
      <Button size="icon" onClick={handleClick} variant="ghost">
        <ArrowLeft size={24} />
      </Button>
    </div>
  );
};
export default NavigationBackButton;