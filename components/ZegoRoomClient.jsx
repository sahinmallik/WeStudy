"use client";

import React, { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

const ZegoRoomClient = ({ roomid }) => {
  const containerRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    const startZegoRoom = async () => {
      if (!user || !roomid) return;

      try {
        // Ensure you're importing only on the client side
        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

        if (!appID || !serverSecret) {
          console.error("Missing ZEGOCLOUD env variables.");
          return;
        }

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
      } catch (error) {
        console.error("Failed to load ZEGOCLOUD room:", error);
      }
    };

    // Run only on the client (double check)
    if (typeof window !== "undefined") {
      startZegoRoom();
    }
  }, [roomid, user]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoRoomClient;
