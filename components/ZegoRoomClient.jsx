"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

const ZegoRoomClient = ({ roomid }) => {
  const containerRef = useRef(null);
  const { user } = useUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !roomid || typeof window === "undefined") return;

    // Add this polyfill before loading ZegoCloud
    if (typeof window !== "undefined" && !window.global) {
      window.global = window;
    }

    const startZegoRoom = async () => {
      try {
        // Import crypto-js before ZegoCloud to ensure it's available
        await import("crypto-js");

        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

        if (!appID || !serverSecret) {
          throw new Error("ZEGOCLOUD env vars are missing");
        }

        // Generate token
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
          showScreenSharingButton: true,
        });
      } catch (err) {
        console.error("Failed to load ZEGOCLOUD room:", err);
        setError(`Error: ${err.message}`);
      }
    };

    // Delay execution slightly (helps avoid hydration timing issues)
    const timer = setTimeout(() => startZegoRoom(), 500);

    return () => clearTimeout(timer);
  }, [roomid, user]);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Connection Error
          </h2>
          <p className="text-gray-700">{error}</p>
          <p className="mt-4 text-gray-600">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoRoomClient;
