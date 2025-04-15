"use client";

import React, { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

const ZegoRoomClient = ({ roomid }) => {
  const containerRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    const startZegoRoom = async () => {
      if (!user || !roomid) return;

      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
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
    };

    startZegoRoom();
  }, [roomid, user]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoRoomClient;
