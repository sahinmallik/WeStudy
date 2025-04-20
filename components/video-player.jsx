"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef } from "react";

const VideoPlayer = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 hero-image-wrapper mb-12">
      <div ref={imageRef} className="hero-image">
        <Image
          src="/hero.png"
          width={1280}
          height={720}
          alt="Banner img"
          className="rounded-lg shadow-2xl border mx-auto"
          priority
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
