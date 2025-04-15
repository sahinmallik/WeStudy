"use client";

import React, { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

const ZegoRoomClient = ({ roomid }) => {
  const containerRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user || !roomid || typeof window === "undefined") return;

    const startZegoRoom = async () => {
      try {
        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

        if (!appID || !serverSecret) {
          console.error("ZEGOCLOUD env vars are missing");
          return;
        }

        // ✅ Only for development/testing
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomid,
          user?.id || Date.now().toString(),
          user?.fullName || "Guest"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      } catch (err) {
        console.error("Failed to load ZEGOCLOUD room:", err);
      }
    };

    // Delay execution slightly (helps avoid hydration timing issues)
    setTimeout(() => startZegoRoom(), 100);
  }, [roomid, user]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoRoomClient;
