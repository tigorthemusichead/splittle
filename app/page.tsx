import Image from "next/image";
import Example from "@/components/Example";
import {LampContainer, LampDemo} from "@/components/ui/lamp";
import {motion} from "framer-motion";
import React from "react";
import LampHero from "@/components/chunks/lamp-hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LampHero/>
    </main>
  );
}
