"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Use dynamic import with no SSR
const ZegoRoomClient = dynamic(() => import("@/components/ZegoRoomClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="text-xl font-semibold">Loading video conference...</div>
    </div>
  ),
});

const RoomPage = ({ params }) => {
  const { roomid } = params;

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ZegoRoomClient roomid={roomid} />
    </Suspense>
  );
};

export default RoomPage;
