"use client";

import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useUser } from "@clerk/nextjs";

const ZegoRoomClient = ({ roomid }) => {
  const containerRef = useRef(null);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !roomid) return;

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomid,
      user?.id,
      user?.fullName || "Guest"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });

    setIsLoading(false); // Stop loading once the room is joined
  }, [roomid, user]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading...
      </div>
    ); // Show loading effect
  }

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoRoomClient;
