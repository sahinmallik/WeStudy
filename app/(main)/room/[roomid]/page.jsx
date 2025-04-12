"use client";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { use, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

const Room = ({ params }) => {
  const containerRef = useRef(null);
  const { roomid } = use(params);
  const { user } = useUser();

  useEffect(() => {
    if (!user || !roomid) return;

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomid,
      user.id,
      user.fullName || "Guest"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }, [roomid, user]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Room;
